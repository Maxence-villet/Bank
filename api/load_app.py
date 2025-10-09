from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.user_router import router as user_router
from api.routers.account_router import router as account_router
from api.routers.current_account_router import router as current_account_router
from api.routers.auth import router as auth_router
from api.routers.beneficiary_router import router as beneficiary_router

from db.database import create_db_and_tables

def load_app():
    app = FastAPI()

    create_db_and_tables()

    app.include_router(user_router)
    app.include_router(account_router)
    app.include_router(current_account_router)
    app.include_router(auth_router)
    app.include_router(beneficiary_router)

    origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ]

    app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    return app

