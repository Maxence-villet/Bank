from fastapi import APIRouter
from api.crud.deposit_crud import (
    get_daily_deposit,
    add_to_daily_deposit
)

router = APIRouter(prefix="/deposits", tags=["deposits"])

@router.patch("/{account_id}/{amount}", tags=["deposits"])
async def api_deposit(account_id: str, amount: int, user_id: str):
    message = add_to_daily_deposit(account_id, user_id, amount)
    return message

@router.get("/daily_deposit/{account_id}", tags=["deposits"])
async def api_get_daily_deposit(account_id: str):
    amount = get_daily_deposit(account_id)
    return {"daily_deposit": amount}