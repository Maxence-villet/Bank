from datetime import timedelta
from api.crud.user_crud import get_user_by_email
from passlib.context import CryptContext
from utils.auth import create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(email: str, password: str) -> bool:
    user = get_user_by_email(email)
    if not user or not pwd_context.verify(password, user.password):
        return False
        
    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}