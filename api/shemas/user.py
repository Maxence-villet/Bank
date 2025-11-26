from datetime import datetime

from sqlmodel import SQLModel


class UserPublic(SQLModel):
    first_name: str
    last_name: str
    email: str
    register_at: datetime