from fastapi import APIRouter
from crud.account_crud import (
    open_account,
    get_accounts,
    get_account_by_id,
    close_account,
    deposit_money,
    get_daily_deposit
)

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.post("/open")
async def api_open_account(user_id: str):
    message = open_account(user_id)
    return message

@router.get("/by_user/{user_id}", tags=["accounts"])
async def api_get_accounts(user_id: str):
    accounts = get_accounts(user_id)
    return accounts

@router.get("/{account_id}", tags=["accounts"])
async def api_get_account_by_id(account_id: str):
    account = get_account_by_id(account_id)
    return account

@router.delete("/close/{account_id}", tags=["accounts"])
async def api_close_account(account_id: str):
    message = close_account(account_id)
    return message

@router.patch("/deposit/{account_id}/{amount}", tags=["accounts"])
async def api_deposit(account_id: str, amount: int):
    message = deposit_money(account_id, amount)
    return message

@router.get("/daily_deposit/{account_id}", tags=["accounts"])
async def api_get_daily_deposit(account_id: str):
    amount = get_daily_deposit(account_id)
    return {"daily_deposit": amount}
