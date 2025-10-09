from datetime import date
from api.crud.account_crud import get_account_by_id
from models.deposit import DailyDeposit
from models.account import Account
from sqlmodel import Session, select
from db.database import engine

def create_daily_deposit(account_id: str, user_id: str, amount: int):
    if amount < 1 or amount > 200000:
        return {"error": "Deposit amount must be between 1 and 200,000.", "status_code": 400}
    with Session(engine) as db:
        daily_deposit = DailyDeposit(account_id=account_id, user_id=user_id, deposited_amount=amount)
        db.add(daily_deposit)
        db.commit()
        db.refresh(daily_deposit)
        return daily_deposit

def get_daily_deposit(account_id: str):
    with Session(engine) as db:
        statement = select(DailyDeposit).where(
            DailyDeposit.account_id == account_id,
            DailyDeposit.deposit_date == date.today()
        )
        daily_deposit = db.exec(statement).first()
        if daily_deposit:
            return daily_deposit.deposited_amount
        return 0
    
def add_to_daily_deposit(account_id: str, user_id:str, amount: int):
    dayli_deposit = get_daily_deposit(account_id)

    if dayli_deposit + amount > 200000:
        return {"error": "Daily deposit limit of 2000,00 exceeded.", "status_code": 403}
    if amount < 1:
        return {"error": "Deposit amount must be positive.", "status_code": 400}
    if dayli_deposit == 0:
        create_daily_deposit(account_id, user_id, amount)
    else:
        update_daily_deposit(account_id, amount)
    
    return deposit_money(account_id, amount)
    
def update_daily_deposit(account_id: str, amount: int):
    if amount < 1 or amount > 200000:
        return {"error": "Deposit amount must be between 1 and 200,000.", "status_code": 400}
    
    with Session(engine) as db:
        statement = select(DailyDeposit).where(
            DailyDeposit.account_id == account_id,
            DailyDeposit.deposit_date == date.today()
        )
        daily_deposit = db.exec(statement).first()
        if daily_deposit:
            daily_deposit.deposited_amount += amount
            db.add(daily_deposit)
            db.commit()
            db.refresh(daily_deposit)
            return daily_deposit
        return None
    
def deposit_money(account_id: str, amount: int):
    account = get_account_by_id(account_id)
    if account is None:
        return {"error": "Account not found.", "status_code": 404}
    if amount < 1:
        return {"error": "Deposit amount must be positive.", "status_code": 400}
    account.amount += amount
    with Session(engine) as db:
        db.add(account)
        db.commit()
        db.refresh(account)
        return {"message": "Deposit successful.", "status_code": 200}