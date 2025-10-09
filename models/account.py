from datetime import datetime
from uuid import uuid4

from sqlmodel import Field, SQLModel
from utils.iban_generator import iban_generator
from models.beneficiary import Beneficiary
from typing import List

class Account(SQLModel, table=True):
    id: str | None = Field(default="O" + str(uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    amount: int = Field(default=0)
    iban: str = Field(default=iban_generator())
    open_at: datetime = Field(default=datetime.now)

    def __init__(self, user_id: str):
        self.user_id: str = user_id
    
    def __repr__(self) -> str:
        return f"Account(id={self.id}, user_id={self.user_id}, amount={self.amount}, iban={self.iban}, open_at={self.open_at})"

    @property
    def is_current_account(self) -> bool:
        return self.id.startswith("C")
    
    @property
    def is_ordinary_account(self) -> bool:
        return self.id.startswith("O")