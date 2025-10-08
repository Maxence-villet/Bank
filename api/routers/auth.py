from fastapi import APIRouter
from api.crud.auth import authenticate_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def api_login_user(email: str, password: str):
    result = authenticate_user(email, password)
    return result