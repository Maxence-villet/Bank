from typing import List, Dict, Optional, Union
from models.account import Account
from models.current_account import CurrentAccount
from models.deposit import DepositService

# Fake data storage using lists and dictionaries
accounts: list[Account] = []
daily_deposits: dict[str, int] = {}

# Service pour gérer les dépôts
deposit_service = DepositService(daily_deposits, accounts)

def get_number_of_accounts(user_id: str) -> int:
    accounts_number = 0
    for account in accounts:
        if account.user_id == user_id:
            accounts_number += 1

    return accounts_number

def close_account(account_id: str) -> dict:
    global accounts
    for account in accounts:
        if account.id == account_id:
            if account.is_current_account:
                return {"error": "Cannot close a current account.", "status_code": 403}
            accounts.remove(account)
            return {"message": "Account closed successfully.", "status_code": 200}
    return {"error": "Account not found.", "status_code": 404}

def open_account(user_id: str) -> dict:
    global accounts
    if get_number_of_accounts(user_id) >= 4:
        return {"error": "Maximum number of accounts reached.", "status_code": 403}
    new_account = Account(user_id)
    accounts.append(new_account)
    return {"message": "Account opened successfully.", "status_code": 200}

def open_current_account(user_id: str) -> dict:
    global accounts
    new_account = CurrentAccount(user_id)
    accounts.append(new_account)
    return {"message": "Current account opened successfully.", "status_code": 200}

def get_accounts(user_id: str) -> list[Account]:
    accounts_by_user_id: list[Account] = []
    for account in accounts:
        if account.user_id == user_id:
            accounts_by_user_id.append(account)
    if len(accounts_by_user_id) == 0:
        return []
    else:
        return accounts_by_user_id

def get_all_accounts() -> list[Account]:
    return accounts

def get_account_by_id(account_id: str) -> Optional[Account]:
    for account in accounts:
        if account.id == account_id:
            return account
    return None

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
