from fastapi import APIRouter, HTTPException
from api.crud.user_crud import register_user, get_user
from utils.auth import get_current_user
from fastapi import Depends

router = APIRouter(prefix="/user", tags=["user"])

@router.post("/register")
async def api_register_user(first_name: str, last_name: str, email: str, password: str):
    result = register_user(first_name, last_name, email, password)
    if result["status_code"] != 200:
        raise HTTPException(status_code=result["status_code"], detail=result["message"])
    return {"message": result["message"]}

@router.get("/")
async def api_get_user(current_user: str = Depends(get_current_user)):
    users = get_user(current_user)
    return users