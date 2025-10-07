from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User:
    id: int
    first_name: str
    last_name: str
    email: str
    password: str
    register_at: datetime

    def __init__(self, first_name: str, last_name: str, email: str, password: str):
        self.id = uuid4().int >> 64
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = pwd_context.hash(password)
        self.register_at = datetime.now()

users: list[User] = []

def register_user(first_name: str, last_name: str, email: str, password: str) -> User:
    new_user = User(first_name, last_name, email, password)
    users.append(new_user)

@router.post('/register')
def register(first_name: str, last_name: str, email: str, password: str):
    register_user(first_name, last_name, email, password)
    return {"message": "User registered successfully"}

@router.get('/users')
def get_users():
    return users