from fastapi import APIRouter, HTTPException
from api.crud.user_crud import register_user, get_user
from utils.auth import get_current_user
from fastapi import Depends
from api.shemas.user import UserRegister

router = APIRouter(prefix="/user", tags=["user"])

@router.post("/register")
async def api_register_user(user_data: UserRegister):
    result = register_user(user_data.first_name, user_data.last_name, user_data.email, user_data.password)
    if result["status_code"] != 200:
        raise HTTPException(status_code=result["status_code"], detail=result["message"])
    return {"message": result["message"]}

@router.get("/")
async def api_get_user(current_user: str = Depends(get_current_user)):
    users = get_user(current_user)
    return users


