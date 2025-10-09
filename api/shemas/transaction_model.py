from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionBaseModel(BaseModel):
    sender_id: str
    receiver_id: str
    amount: int

class TransactionReadModel(TransactionBaseModel):
    uuid_transaction: str
    pending_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None

    class Config:
        orm_mode = True