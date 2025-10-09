from datetime import datetime
from uuid import uuid4
from passlib.context import CryptContext
from sqlmodel import Field, SQLModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    password: str = Field(nullable=False)
    register_at: datetime = Field(default_factory=datetime.now)

    @classmethod
    def create(cls, first_name: str, last_name: str, email: str, password: str) -> "User":
        return cls(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=pwd_context.hash(password)
        )