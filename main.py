from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers.user_router import router as user_router
from api.routers.account_router import router as account_router
from api.routers.current_account_router import router as current_account_router

app = FastAPI()
app.include_router(user_router)
app.include_router(account_router)
app.include_router(current_account_router)

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