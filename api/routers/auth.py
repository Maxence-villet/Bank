from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from api.crud.auth import authenticate_user
from api.shemas.user import ChangePassword
from api.crud.user_crud import change_password
from utils.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@router.post("/change-password")
async def api_change_password(change_data: ChangePassword, current_user: str = Depends(get_current_user)):
    if isinstance(current_user, dict):
        raise HTTPException(
            status_code=current_user.get("status_code", 401),
            detail=current_user.get("error", {}).detail if isinstance(current_user.get("error"), HTTPException) else "Authentication failed"
        )
    
    result = change_password(current_user, change_data.current_password, change_data.new_password)
    if "error" in result:
        raise HTTPException(status_code=result["status_code"], detail=result["error"])
    
    return {"message": result["message"]}
    
