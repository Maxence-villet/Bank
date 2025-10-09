from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4
from passlib.context import CryptContext
from sqlmodel import Field, SQLModel

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(SQLModel, table=True):
    id: str | None = Field(default=str(uuid4()), primary_key=True)
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    email: str = Field(index=True)
    password: str = Field(nullable=False)
    register_at: datetime = Field(default=datetime.now)

    def __init__(self, first_name: str, last_name: str, email: str, password: str):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = pwd_context.hash(password)
        self.register_at = datetime.now()