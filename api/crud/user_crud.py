from typing import Optional
from models.user import User
from sqlmodel import Session, select
from db.database import engine

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

        from api.crud.account_crud import open_current_account
        open_current_account(new_user.id)

        return {"message": "User registered successfully", "status_code": 200}

def get_users() -> list[User]:
    with Session(engine) as db:
        statement = select(User)
        users = db.exec(statement).all()
        return users

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