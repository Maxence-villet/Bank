from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from api.entities.transaction_status import TransactionStatus
from uuid import UUID

class TransactionBaseModel(BaseModel):
    uuid_transaction: str
    sender_id: str
    receiver_id: str
    amount: int # Conservé comme 'int' selon votre demande
    
    description: Optional[str] = ""

    # --- CHAMPS AJOUTÉS CI-DESSOUS ---
    
    # Les horodatages sont optionnels (None) s'ils ne sont pas encore définis
    pending_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    
    # Le statut final (traité comme une chaîne simple, ex: 'completed', 'pending', etc.)
    status: str 

class TransactionCreate(BaseModel):
    sender_id: str
    receiver_id: str
    amount: int
    description: str = ""

class TransactionReadModel(TransactionBaseModel):
    uuid_transaction: str
    pending_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None

    class Config:
        orm_mode = True