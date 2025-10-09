from datetime import datetime
from uuid import uuid4
from utils.iban_generator import iban_generator
from models.beneficiary import Beneficiary
from typing import List

class Account:


    def __init__(self, user_id: str):
        self.id: str = "O" + str(uuid4())
        self.user_id: str = user_id
        self.amount: str = 0
        self.iban: str = iban_generator()
        self.open_at: datetime = datetime.now()
        self.beneficiaries: List[Beneficiary] = []

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "amount": self.amount,
            "iban": self.iban,
            "open_at": self.open_at.isoformat(),
            "beneficiaries": [beneficiary.to_dict() for beneficiary in self.beneficiaries]
        }
    
    def __repr__(self) -> str:
        return f"Account(id={self.id}, user_id={self.user_id}, amount={self.amount}, iban={self.iban}, open_at={self.open_at})"

    @property
    def is_current_account(self) -> bool:
        return self.id.startswith("C")
    
    @property
    def is_ordinary_account(self) -> bool:
        return self.id.startswith("O")