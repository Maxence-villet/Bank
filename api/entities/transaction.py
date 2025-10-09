from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4
from typing import Optional
from api.entities.transaction_status import TransactionStatus

@dataclass(frozen=True)
class Transaction:
    sender_id: str
    receiver_id: str
    amount: float
    uuid_transaction: Optional[str] = None
    pending_at: datetime = field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    status: TransactionStatus = field(default=TransactionStatus.pending)
    description: Optional[str] = ""

    def check_pending(self) -> bool:
        return self.status == TransactionStatus.pending

    def mark_completed(self):
        if not self.check_pending():
            raise ValueError("Transaction already finalized.")
        object.__setattr__(self, "completed_at", datetime.now())
        object.__setattr__(self, "status", TransactionStatus.completed)

    def mark_failed(self):
        if not self.check_pending():
            raise ValueError("Transaction already finalized.")
        object.__setattr__(self, "failed_at", datetime.now())
        object.__setattr__(self, "status", TransactionStatus.failed)

    def mark_cancelled(self):
        if not self.check_pending():
            raise ValueError("Transaction already finalized.")
        object.__setattr__(self, "cancelled_at", datetime.now())
        object.__setattr__(self, "status", TransactionStatus.cancelled)
