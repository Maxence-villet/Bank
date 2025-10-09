from fastapi import APIRouter
from api.crud.transaction_action import (
    create_transaction,
    finalize_transaction,
    get_transactions,
    get_transaction_details
)

router = APIRouter(prefix="/transaction", tags=["transaction"])

@router.get("/by_account/{account_id}", tags=["transaction"])
async def api_get_transactions(account_id: str):
    transactions = get_transactions(account_id)
    return transactions 

@router.get("/by_account/{account_id}", tags=["transaction"])
async def api_get_transaction_details(transaction_id: str):
    transaction = get_transaction_details(transaction_id)
    return transaction 

@router.post("/create")
async def api_create_transaction(transaction_id: str):
    transaction = create_transaction(transaction_id)
    return transaction

@router.patch("/cancel/{transaction_id}", tags=["accounts"])
async def api_finalize(transaction_id : str):
    message = finalize_transaction(transaction_id, False)
    return message



