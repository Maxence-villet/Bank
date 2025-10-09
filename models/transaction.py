from sqlmodel import SQLModel, Field
from datetime import datetime
from uuid import uuid4
from typing import Optional
from api.entities.transaction_status import TransactionStatus

class TransactionModel(SQLModel, table=True):
    __tablename__ = "transactions"

    uuid_transaction: str = Field(default_factory=lambda: str(uuid4()), primary_key=True, index=True)
    sender_id: str = Field(index=True)
    receiver_id: str = Field(index=True)
    amount: float
    pending_at: datetime = Field(default_factory=datetime.now, index=True)
    completed_at: Optional[datetime] = Field(default=None, index=True)
    failed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    status: TransactionStatus = Field(default=TransactionStatus.pending, index=True)

