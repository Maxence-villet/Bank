from typing import List, Dict, Optional, Union
from models.account import Account
from models.current_account import CurrentAccount
from models.deposit import DepositService
from api.crud.user_crud import get_user_by_id
from sqlmodel import Session, select
from db.database import engine

# Fake data storage using lists and dictionaries
accounts: list[Account] = []
daily_deposits: dict[str, int] = {}

# Service pour gérer les dépôts
deposit_service = DepositService(daily_deposits, accounts)

def get_number_of_accounts(user_id: str) -> int:
    with Session(engine) as db:
        statement = select(Account).where(Account.user_id == user_id)
        accounts = db.exec(statement).all()
        return len(accounts)

def close_account(account_id: str) -> dict:
    account = get_account_by_id(account_id)
    if account is None:
        return {"error": "Account not found.", "status_code": 404}
    if account.is_current_account:
        return {"error": "Cannot close a current account.", "status_code": 403}
    with Session(engine) as db:
        db.delete(account)
        db.commit()
        return {"message": "Account closed successfully.", "status_code": 200}

def open_account(user_id: str) -> dict:
    user = get_user_by_id(user_id)
    if user is None:
        return {"error": "User not found.", "status_code": 404}
    if get_number_of_accounts(user.id) >= 4:
        return {"error": "Maximum number of accounts reached.", "status_code": 403}


    account = Account(user.id)
    with Session(engine) as db:
        db.add(account)
        db.commit()
        db.refresh(account)
        return {"message": "Account opened successfully.", "status_code": 200}
    

def open_current_account(user_id: str) -> dict:
    user = get_user_by_id(user_id)
    if user is None:
        return {"error": "User not found.", "status_code": 404}
    
    if get_number_of_accounts(user.id) > 0:
        return {"error": "User already has an current account.", "status_code": 403}

    account = CurrentAccount.create(user.id)
    with Session(engine) as db:
        db.add(account)
        db.commit()
        db.refresh(account)
        return {"message": "Current account opened successfully.", "status_code": 200}

def get_accounts(user_id: str) -> list[Account]:
    user = get_user_by_id(user_id)
    if user is None:
        return {"error": "User not found.", "status_code": 404}
    
    with Session(engine) as db:
        statement = select(Account).where(Account.user_id == user.id)
        accounts = db.exec(statement).all()
        if len(accounts) == 0:
            return []
        return accounts
    
    
def get_account_by_id(account_id: str) -> Optional[Account]:
    with Session(engine) as db:
        statement = select(Account).where(Account.id == account_id)
        account = db.exec(statement).first()
        if account is None:
            return None
        else:
            return account

def get_daily_deposit(account_id: str) -> int:
    return deposit_service.get_daily_deposit(account_id)

def get_account_balance(account_id: str) -> Optional[int]:
    account = get_account_by_id(account_id)
    if account is None:
        return None
    else:
        return account.amount

def deposit_money(account_id: str, amount: int) -> dict:
    # Valider le dépôt
    validation_error = deposit_service.validate_deposit(account_id, amount)
    if validation_error:
        return {"error": validation_error, "status_code": 403}

    # Exécuter le dépôt
    success = deposit_service.execute_deposit(account_id, amount)
    if success:
        return {"message": "Deposit successful.", "status_code": 200}
    else:
        return {"error": "Deposit failed. Account not found.", "status_code": 404}
