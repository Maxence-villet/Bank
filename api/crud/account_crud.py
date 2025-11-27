from typing import List, Dict, Optional, Union
from models.account import Account
from models.current_account import CurrentAccount
from models.transaction import TransactionModel
from api.entities.transaction import Transaction
from api.crud.user_crud import get_user_by_id
from sqlmodel import Session, select, desc
from db.database import engine
from uuid import uuid4

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

    current_account = get_current_account(account.user_id)
    if current_account is None:
        return {"error": "No current account found for this user.", "status_code": 404}

    with Session(engine) as db:
        if account.amount > 0:
            transfer_tx = Transaction(
                sender_id=account_id,
                receiver_id=current_account.id,
                amount=account.amount,
                uuid_transaction=str(uuid4()),
                description=f"Transfert automatique lors de la clôture du compte {account_id}"
            )

            tx_model = TransactionModel.model_validate(transfer_tx)
            db.add(tx_model)

            transfer_tx.mark_completed()
            tx_model.status = transfer_tx.status
            tx_model.completed_at = transfer_tx.completed_at

            account.amount -= transfer_tx.amount
            current_account.amount += transfer_tx.amount

            db.add(account)
            db.add(current_account)

        db.delete(account)
        db.commit()
        return {"message": "Account closed successfully. Remaining funds transferred to current account.", "status_code": 200}

def open_account(user_id: str, name: str) -> dict:
    user = get_user_by_id(user_id)
    if user is None:
        return {"error": "User not found.", "status_code": 404}
    if get_number_of_accounts(user.id) >= 5:
        return {"error": "Maximum number of accounts reached.", "status_code": 403}


    account = Account(user.id, name=name)
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
        return {"error": "User already has a current account.", "status_code": 403}

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
        statement = select(Account).where(Account.user_id == user.id).order_by(desc(Account.open_at))
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

def is_account_owner(account_id: str, user_id: str) -> bool:
    account = get_account_by_id(account_id)
    if account is None:
        return False
    return account.user_id == user_id

def get_account_by_iban(iban: str) -> Optional[Account]:
    with Session(engine) as db:
        statement = select(Account).where(Account.iban == iban)
        account = db.exec(statement).first()
        if account is None:
            return None
        else:
            return account

def get_current_account(user_id: str) -> Optional[Account]:
    with Session(engine) as db:
        statement = select(Account).where(
            (Account.user_id == user_id) & (Account.id.like("C%"))
        )
        account = db.exec(statement).first()
        return account

