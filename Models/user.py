from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User:
    id: str
    first_name: str
    last_name: str
    email: str
    password: str
    register_at: datetime

    def __init__(self, first_name: str, last_name: str, email: str, password: str):
        truncated_password = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
        self.id = str(uuid4())
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = pwd_context.hash(truncated_password)
        self.register_at = datetime.now()