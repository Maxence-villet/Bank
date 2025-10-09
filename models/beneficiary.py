from uuid import uuid4
from datetime import datetime

class Beneficiary:
    def __init__(self, account_id: str, first_name: str, last_name: str, iban: str, user_id: str):
        self.id = str(uuid4())
        self.account_id = account_id  # Compte propriétaire du bénéficiaire
        self.first_name = first_name
        self.last_name = last_name
        self.iban = iban
        self.user_id = user_id
        self.register_at = datetime.now()

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "account_id": self.account_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "iban": self.iban,
            "register_at": self.register_at.isoformat()
        }

    def __repr__(self) -> str:
        return f"beneficiary(id={self.id}, account_id={self.account_id}, first_name={self.first_name}, last_name={self.last_name}, iban={self.iban})"

    