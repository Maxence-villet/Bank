from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Class.user import router as user_router
from Class.Account import router as account_router

app = FastAPI()
app.include_router(user_router)
app.include_router(account_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}