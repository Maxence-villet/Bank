from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4

router = APIRouter()

class Account:
    id: int
    user_id: int
    amount: float
    iban: str
    open_at: datetime

    def __init__(self, user_id: int):
        self.id = uuid4().int >> 64
        self.user_id = user_id
        self.amount = 0.0
        self.iban = f"IBAN{self.id:06d}"
        self.open_at = datetime.now()

accounts: list[Account] = []

def get_number_of_accounts(user_id: int) -> int:
    return len([account for account in accounts if account.user_id == user_id])

def close_account(account_id: int) -> bool:
    for account in accounts:
        if account.id == account_id:
            accounts.remove(account)
            return True
    return False

def open_account(user_id: int) -> Account | None:
    if get_number_of_accounts(user_id) >= 4:
        return None
    new_account = Account(user_id)
    accounts.append(new_account)
    return new_account

def get_accounts(user_id: int) -> list[Account]:
    return [account for account in accounts if account.user_id == user_id]

@router.post("/open_account/")
def api_open_account(id: int):
    account = open_account(id)
    if account is None:
        return {"error": "Maximum number of accounts reached."}
    return account

@router.get("/accounts/{user_id}")
def api_get_accounts(user_id: int):
    user_accounts = get_accounts(user_id)
    return user_accounts

@router.get("/accounts/")
def api_get_all_accounts():
    return accounts

@router.delete("/close_account/{account_id}")
def api_close_account(account_id: int):
    success = close_account(account_id)
    if success:
        return {"message": "Account closed successfully." + str(account_id) + str(accounts)}
    return {"error": "Account not found." + str(account_id) + str(accounts)}