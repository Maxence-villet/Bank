from fastapi import APIRouter
from crud.account_crud import open_current_account

router = APIRouter(prefix="/current-accounts", tags=["current-accounts"])

@router.post("/open")
async def api_open_current_account(user_id: str):
    message = open_current_account(user_id)
    return message
