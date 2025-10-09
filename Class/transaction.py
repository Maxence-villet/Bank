from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4
from typing import Optional

@dataclass(frozen=True)
class Transaction:
    sender_id: str
    receiver_id: str
    amount: int
    uuid_transaction: str = field(default_factory=lambda: str(uuid4()))
    pending_at: datetime = field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None

    def __post_init__(self):
        """Validation des données à la création."""
        if not self.sender_id or not self.receiver_id:
            raise ValueError("Les IDs de l'expéditeur et du destinataire doivent être non vides.")
        if not isinstance(self.amount, int):
            raise ValueError("Le montant doit être un entier.")
        if self.amount <= 0:
            raise ValueError("Le montant doit être positif.")
        if self.sender_id == self.receiver_id:
            raise ValueError("L'expéditeur et le destinataire ne peuvent pas être identiques.")

    def mark_pending(self):
        if self.is_finalized():
            raise ValueError("La transaction est déjà finalisée.")
        object.__setattr__(self, "pending_at", datetime.now())

    def mark_completed(self):
        if self.is_finalized():
            raise ValueError("La transaction est déjà finalisée.")
        object.__setattr__(self, "completed_at", datetime.now())

    def mark_failed(self):
        if self.is_finalized():
            raise ValueError("La transaction est déjà finalisée.")
        object.__setattr__(self, "failed_at", datetime.now())

    def mark_cancelled(self):
        if self.is_finalized():
            raise ValueError("La transaction est déjà finalisée.")
        object.__setattr__(self, "cancelled_at", datetime.now())

    def is_finalized(self) -> bool:
        return any([self.completed_at, self.failed_at, self.cancelled_at])

if __name__ == "__main__":
    try:
        transaction = Transaction(sender_id="user123", receiver_id="user456", amount=100)
        transaction.mark_completed()
        print(transaction)
    except ValueError as e:
        print(f"Erreur: {e}")