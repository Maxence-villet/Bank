from datetime import datetime
from uuid import uuid4
from models.account import Account
from utils.generate_iban import generate_iban


class CurrentAccount(Account):
    def __init__(self, user_id: str):
        self.id: str = "C" + str(uuid4())
        self.user_id: str = user_id
        self.amount: str = 0
        self.iban: str = generate_iban()
        self.open_at: datetime = datetime.now()
    
    def __repr__(self) -> str:
        return f"CurrentAccount(id={self.id}, user_id={self.user_id}, amount={self.amount}, iban={self.iban}, open_at={self.open_at})"

    