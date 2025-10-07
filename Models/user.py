from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from sqlmodel import Field 

app = FastAPI()

class User(BaseModel) : 
    id : int
    first_name : str
    last_name : str
    email : str
    password : str
    register_at : datetime = Field(default_factory=datetime.now)
    
    
@app.post("/register/")
def register_user(user : User):
    return User 

