from fastapi import APIRouter, Depends
from typing import List
from api.crud.transaction_action import (
    create_transaction,
    finalize_transaction,
    get_transactions,
    get_transaction_details
)
from api.entities.transaction import Transaction
from api.shemas.transaction_model import TransactionBaseModel, TransactionCreate  # Assume TransactionCreate is {sender_id: str, receiver_id: str, amount: int, description: Optional[str] = ""}
from utils.auth import get_current_user

router = APIRouter(prefix="/transaction", tags=["Transaction"])

@router.get("/by_account/{account_id}", response_model=List[TransactionBaseModel])
async def api_get_transactions(account_id: str, current_user: str = Depends(get_current_user)):
    print(f"[DEBUG] account_id reçu : {account_id}")
    transactions = get_transactions(account_id)
    return transactions

@router.get("/details_transaction/{transaction_id}", response_model=Transaction)
async def api_get_transaction_details(transaction_id: str, current_user: str = Depends(get_current_user)):
    transaction = get_transaction_details(transaction_id)
    return transaction

@router.post("/create")
async def api_create_transaction(data: TransactionCreate, current_user: str = Depends(get_current_user)):
    transaction = create_transaction(
        sender_id=data.sender_id, 
        receiver_id=data.receiver_id, 
        amount=data.amount,
        description=getattr(data, 'description', "")
    )
    return transaction

@router.get("/cancel/{transaction_id}")
async def api_finalize(transaction_id: str, current_user: str = Depends(get_current_user)):
    message = finalize_transaction(transaction_id, confirmed=False)
    return message
