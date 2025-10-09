from fastapi import APIRouter
from fastapi import Depends
from utils.auth import get_current_user
from api.crud.account_crud import open_current_account

router = APIRouter(prefix="/current-accounts", tags=["current-accounts"])

@router.post("/open")
async def api_open_current_account(current_user: str = Depends(get_current_user)):
    message = open_current_account(current_user)
    return message
