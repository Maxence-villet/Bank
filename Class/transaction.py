from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4

@dataclass(frozen=True)
class Transaction:
    sender_id: str
    receiver_id: str
    amount: float
    uuid_transaction: str = field(default_factory=lambda: str(uuid4()))
    pending_at: datetime = field(default_factory=datetime.now)
    completed_at: datetime | None = None
    failed_at: datetime | None = None
    cancelled_at: datetime | None = None

    def mark_completed(self):
        object.__setattr__(self, "completed_at", datetime.now())

    def mark_failed(self):
        object.__setattr__(self, "failed_at", datetime.now())

    def mark_cancelled(self):
        object.__setattr__(self, "cancelled_at", datetime.now())

# Example usage:
if __name__ == "__main__":
    transaction = Transaction(sender_id="user123", receiver_id="user456", amount=100.0)
    transaction.mark_completed()
    print(transaction)

