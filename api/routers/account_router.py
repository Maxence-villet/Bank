from fastapi import APIRouter
from fastapi import Depends
from utils.auth import get_current_user

from api.crud.account_crud import (
    open_account,
    get_accounts,
    get_account_by_id,
    close_account,
)

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.post("/open")
async def api_open_account(current_user: str = Depends(get_current_user)):
    message = open_account(current_user)
    return message

@router.get("/user", tags=["accounts"])
async def api_get_accounts(current_user: str = Depends(get_current_user)):
    accounts = get_accounts(current_user)
    return accounts

@router.get("/{account_id}", tags=["accounts"])
async def api_get_account_by_id(account_id: str, current_user: str = Depends(get_current_user)):
    account = get_account_by_id(account_id)
    return account

@router.delete("/close/{account_id}", tags=["accounts"])
async def api_close_account(account_id: str, current_user: str = Depends(get_current_user)):
    message = close_account(account_id)
    return message
