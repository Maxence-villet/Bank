from datetime import datetime
from uuid import uuid4
from typing import Optional
from models.user import User
from api.crud.account_crud import accounts
from models.current_account import CurrentAccount

# Fake data storage using lists
users: list[User] = []

def register_user(first_name: str, last_name: str, email: str, password: str) -> dict:
    new_user = User(first_name, last_name, email, password)
    users.append(new_user)
    # Auto-create a current account for new users
    from crud.account_crud import open_current_account
    open_current_account(new_user.id)
    return {"message": "User registered successfully", "status_code": 200}

def get_users() -> list[User]:
    return users

def get_user_by_id(user_id: str) -> Optional[User]:
    for user in users:
        if user.id == user_id:
            return user
    return None

def get_user_by_email(email: str) -> Optional[User]:
    for user in users:
        if user.email == email:
            return user
    return None
