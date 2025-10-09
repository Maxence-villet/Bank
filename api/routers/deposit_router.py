from fastapi import APIRouter
from fastapi import Depends
from utils.auth import get_current_user
from api.crud.deposit_crud import (
    get_daily_deposit,
    add_to_daily_deposit
)

router = APIRouter(prefix="/deposits", tags=["deposits"])

@router.patch("/{account_id}/{amount}", tags=["deposits"])
async def api_deposit(account_id: str, amount: int, current_user: str = Depends(get_current_user)):
    message = add_to_daily_deposit(account_id, current_user, amount)
    return message

@router.get("/daily_deposit/{account_id}", tags=["deposits"])
async def api_get_daily_deposit(account_id: str, current_user: str = Depends(get_current_user)):
    amount = get_daily_deposit(account_id, current_user)
    return {"daily_deposit": amount}