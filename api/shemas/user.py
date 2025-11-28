from sqlmodel import SQLModel
from pydantic import EmailStr, BaseModel
from datetime import datetime

class UserRegister(SQLModel):
    first_name: str
    last_name: str
    email: EmailStr 
    password: str

    class Config:
        # Ceci permet d'utiliser des exemples pour la documentation OpenAPI (optionnel mais utile)
        schema_extra = {
            "example": {
                "first_name": "Jean",
                "last_name": "Dupont",
                "email": "jean.dupont@exemple.com",
                "password": "MotDePasseSecret123"
            }
        }
class UserPublic(SQLModel):
    first_name: str
    last_name: str
    email: str
    register_at: datetime
        
class ChangePassword(BaseModel):
    current_password: str
    new_password: str
        
