from pydantic import BaseModel, Field
from typing import Optional

class AccountCreate(BaseModel):
    name: str = Field(..., description="Le nom du compte à créer (ex: 'Compte Épargne')", example="Mon Compte Épargne")
