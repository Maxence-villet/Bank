from fastapi import APIRouter
from api.crud.auth import authenticate_user
from utils.auth import get_current_token, logout

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def api_login_user(email: str, password: str):
    result = authenticate_user(email, password)
    return result

@router.post("/logout")
async def api_logout_user():
    logout()
    return {"message": "Successfully logged out"}

@router.post("/token")
async def api_token():
    token = get_current_token()
    return {"token": token}
    
