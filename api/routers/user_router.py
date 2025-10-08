from fastapi import APIRouter
from api.crud.user_crud import register_user, get_users

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register")
async def api_register_user(first_name: str, last_name: str, email: str, password: str):
    message = register_user(first_name, last_name, email, password)
    return message

@router.get("/")
async def api_get_users():
    users = get_users()
    return users
