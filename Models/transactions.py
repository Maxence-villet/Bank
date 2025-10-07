from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from sqlmodel import Field

app = FastAPI()

class Transactions(BaseModel):
    id: int
    amount: float
    date: datetime = Field(default_factory=datetime.now)
    recipient_account_id: int
    user_id: int
    sender_account_id: int

@app.post("/transactions/")
def create_transaction(transaction: Transactions):
    return transaction