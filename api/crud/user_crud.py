from typing import Optional
from models.user import User
from api.crud.account_crud import accounts, open_current_account
from db.database import Session

def register_user(first_name: str, last_name: str, email: str, password: str) -> dict:
    db = Session()
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return {"message": "Email already registered", "status_code": 400}

    new_user = User(first_name=first_name, last_name=last_name, email=email, password=password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    open_current_account(new_user.id)

    db.close()
    return {"message": "User registered successfully", "status_code": 200}

def get_users() -> list[User]:
    db = Session()
    users = db.query(User).all()
    db.close()
    return users

def get_user_by_id(user_id: str) -> Optional[User]:
    db = Session()
    user = db.query(User).filter(User.id == user_id).first()
    db.close()
    return user

def get_user_by_email(email: str) -> Optional[User]:
    db = Session()
    user = db.query(User).filter(User.email == email).first()
    db.close()
    return user