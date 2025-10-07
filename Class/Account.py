from datetime import datetime
from fastapi import APIRouter
from uuid import uuid4

router = APIRouter()

class Account:
    id: str
    user_id: str
    amount: int
    iban: str
    open_at: datetime

    def __init__(self, user_id: str):
        self.id = "O" + str(uuid4())
        self.user_id = user_id
        self.amount = 0
        self.iban = generate_iban()
        self.open_at = datetime.now()

accounts: list[Account] = []
daily_deposit: dict[str, int] = {}

def generate_iban() -> str:
    unique_id = uuid4().int >> 64
    return f"FR{unique_id:022d}"

def get_number_of_accounts(user_id: str) -> int:
    return len([account for account in accounts if account.user_id == user_id])

def close_account(account_id: str) -> str:
    global accounts
    for account in accounts:
        if account.id == account_id:
            if account.id[0] == 'C':
                return ("message:", "Cannot close a current account.", 403)
            accounts.remove(account)
            return ("message:", "Account closed successfully.", 200)
    return ("error:", "Account not found.", 404)

def open_account(user_id: str) -> Account:
    global accounts
    if get_number_of_accounts(user_id) >= 4:
        return Account(user_id)
    new_account = Account(user_id)
    accounts.append(new_account)
    return new_account

def get_accounts(user_id: str) -> list[Account]:
    return [account for account in accounts if account.user_id == user_id]

def get_daily_deposit(account_id: str) -> int:
    global daily_deposit
    return daily_deposit.get(account_id, 0)

def get_money(account_id: str) -> int:
    for account in accounts:
        if account.id == account_id:
            return account.amount
    return 0

def deposit_money(account_id:str, amount:int):
    global daily_deposit
    current_money=get_money(account_id)

    if amount < 1:
        return False

    if current_money + amount > 200000:
        return False

    if account_id in daily_deposit:
        daily_deposit[account_id] += amount
    else:
        daily_deposit[account_id] = amount

    for account in accounts:
        if account.id == account_id:
            account.amount += amount
            break

    return True

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
    message: str = close_account(account_id)
    return {message}

@router.get("/daily_deposit/{account_id}")
def api_get_daily_deposit(account_id: str):
    amount = get_daily_deposit(account_id)
    return {"daily_deposit": amount}

@router.patch("/deposit/{account_id}/{amount}")
def api_deposit(account_id: str, amount: int):
    success = deposit_money(account_id, amount)
    if success:
        return {"message": "Deposit successful."}
    return {"error": "Deposit failed."}
