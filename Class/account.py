from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4

router = APIRouter()

class Account:
    id: str
    user_id: str
    amount: float
    iban: str
    open_at: datetime

    def __init__(self, user_id: str):
        self.id = str(uuid4())
        self.user_id = user_id
        self.amount = 0.0
        self.iban = generate_iban()
        self.open_at = datetime.now()

accounts: list[Account] = []

def generate_iban() -> str:
    unique_id = uuid4().int >> 64
    return f"FR{unique_id:022d}"

def get_number_of_accounts(user_id: str) -> int:
    return len([account for account in accounts if account.user_id == user_id])

def close_account(account_id: str) -> bool:
    global accounts
    for account in accounts:
        if account.id == account_id:
            accounts.remove(account)
            return True
    return False

def open_account(user_id: str) -> Account:
    global accounts
    if get_number_of_accounts(user_id) >= 4:
        return Account(user_id)
    new_account = Account(user_id)
    accounts.append(new_account)
    return new_account

def get_accounts(user_id: str) -> list[Account]:
    return [account for account in accounts if account.user_id == user_id]

@router.post("/open_account/")
def api_open_account(id: str):
    account = open_account(id)
    if account.id == 0:
        return {"error": "Maximum number of accounts reached."}
    return account

@router.get("/accounts/{user_id}")
def api_get_accounts(user_id: str):
    user_accounts = get_accounts(user_id)
    return user_accounts

@router.get("/accounts/")
def api_get_all_accounts():
    return accounts

@router.delete("/close_account/{account_id}")
def api_close_account(account_id: str):
    success = close_account(account_id)
    if success:
        return {"message": "Account closed successfully."}
    return {"error": "Account not found."}