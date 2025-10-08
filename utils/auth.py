from datetime import datetime, timedelta, timezone
import jwt
from fastapi.security import OAuth2PasswordBearer

ACCESS_TOKEN_SECRET_KEY = "WEvRjO6fnYKYpAu7jR8T41Tk93OyFvQ4rmmuQ7djuo7S2YQefabzrdoBhhfkwpvkmg3KFjIjnIXiq2xj6V3PlVMnMpV0FskbY17ofddm25cPfdH3rqcDq3KLsdxTL7C4bBvVuyQmCXKfGlBtHG8KakRrpNkNGHA6"
ACCESS_TOKEN_ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token", auto_error=False)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, ACCESS_TOKEN_SECRET_KEY, algorithm=ACCESS_TOKEN_ALGORITHM)
    return encoded_jwt