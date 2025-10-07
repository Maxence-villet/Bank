from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4
from Class.Account import Account, accounts

class CurrentAccount(Account):
    id: str
    user_id: str
    amount: int
    iban: str
    open_at: datetime

    def __init__(self, user_id: str):
        self.id = "C"+str(uuid4())
        self.user_id = user_id
        self.amount = 0
        self.iban = generate_iban()
        self.open_at = datetime.now()

daily_deposit: dict[str, int] = {}

def generate_iban() -> str:
    unique_id = uuid4().int >> 64
    return f"FR{unique_id:022d}"
