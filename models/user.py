from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4
from passlib.context import CryptContext
from sqlalchemy import Column, DateTime, String
from db.database import Base

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    register_at = Column(DateTime, default=datetime.now)

    def __init__(self, first_name: str, last_name: str, email: str, password: str):
        self.id = str(uuid4())
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = pwd_context.hash(password)
        self.register_at = datetime.now()