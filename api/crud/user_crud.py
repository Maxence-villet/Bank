from typing import Optional
from api.shemas.user import UserPublic
from models.user import User
from sqlmodel import Session, select
from db.database import engine
from passlib.context import CryptContext

def register_user(first_name: str, last_name: str, email: str, password: str) -> dict:
    with Session(engine) as db:

        statement = select(User).where(User.email == email)
        existing_user = db.exec(statement).first()

        if existing_user:
            return {"message": "Email already registered", "status_code": 409}

        new_user = User.create(first_name=first_name, last_name=last_name, email=email, password=password)

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        from api.crud.account_crud import open_current_account, get_current_account
        account_result = open_current_account(new_user.id)

        # Créer le bonus de bienvenue si le compte a été créé avec succès
        if account_result.get("status_code") == 200:
            # Récupérer l'ID du compte créé
            current_account = get_current_account(new_user.id)
            if current_account:
                from api.crud.transaction_action import create_welcome_bonus
                user_full_name = f"{new_user.first_name} {new_user.last_name}"
                create_welcome_bonus(current_account.id, user_full_name)

        return {"message": "User registered successfully", "status_code": 200}

def get_user(user_id: str) -> User:
    with Session(engine) as db:
        statement = select(User).where(User.id == user_id)
        user_db: Optional[User] = db.exec(statement).one_or_none()

        if user_db is None:
            return {"error": "User not found.", "status_code": 404}

        return UserPublic(
            first_name=user_db.first_name,
            last_name=user_db.last_name,
            email=user_db.email,
            register_at=user_db.register_at
        ) 

def get_user_by_id(user_id: str) -> Optional[User]:
    with Session(engine) as db:
        statement = select(User).where(User.id == user_id)
        user = db.exec(statement).first()
        return user

def get_user_by_email(email: str) -> Optional[User]:
    with Session(engine) as db:
        statement = select(User).where(User.email == email)
        user = db.exec(statement).first()
        return user

def change_password(user_id: str, current_password: str, new_password: str) -> dict:
    from sqlmodel import Session
    from db.database import engine
    from models.user import User

    user = get_user_by_id(user_id)
    if not user:
        return {"error": "User not found", "status_code": 404}

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    if not pwd_context.verify(current_password, user.password):
        return {"error": "Current password incorrect", "status_code": 400}

    user.password = pwd_context.hash(new_password)

    with Session(engine) as db:
        db.add(user)
        db.commit()
        db.refresh(user)

    return {"message": "Password changed successfully", "status_code": 200}