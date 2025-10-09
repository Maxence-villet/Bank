from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from api.routers.user_router import router as user_router
from api.routers.account_router import router as account_router
from api.routers.current_account_router import router as current_account_router
from api.routers.auth import router as auth_router
from api.routers.beneficiary_router import router as beneficiary_router
from api.routers.transaction_router import router as transaction_router
from api.routers.deposit_router import router as deposit_router

from api.crud.scheduler import TransactionScheduler
from db.database import create_db_and_tables

scheduler_instance = TransactionScheduler(delay=5)
app_scheduler = AsyncIOScheduler()

async def check_transactions():
    await scheduler_instance.check_pending_transactions()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle FastAPI : crée la DB et démarre le cron."""
    create_db_and_tables()

    # Démarrage du scheduler APScheduler
    app_scheduler.add_job(
        check_transactions,
        IntervalTrigger(seconds=3),
        id="transaction_check_job",
        replace_existing=True
    )
    app_scheduler.start()
    print(" Transaction scheduler started")

    yield  

    if app_scheduler.running:
        app_scheduler.shutdown()
        print(" Transaction scheduler stopped")


def load_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)

    # --- Middleware ---
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

    # --- Routers ---
    app.include_router(user_router)
    app.include_router(auth_router)
    app.include_router(account_router)
    app.include_router(current_account_router)
    app.include_router(beneficiary_router)
    app.include_router(transaction_router)
    app.include_router(deposit_router)

    return app
