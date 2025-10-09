from models.beneficiary import Beneficiary
from typing import List, Optional
from api.crud.account_crud import get_accounts, get_account_by_id
from api.crud.user_crud import get_user_by_id

beneficiaries: List[Beneficiary] = []

def add_beneficiary(account_id: str, first_name: str, last_name: str, iban: str, user_id: str) -> dict:
    account = get_account_by_id(account_id)
    if account is None:
        return {"error": "Account not found", "status_code": 404}

    for beneficiary in beneficiaries:
        if (beneficiary.account_id == account_id and
            beneficiary.first_name == first_name and
            beneficiary.last_name == last_name and
            beneficiary.iban == iban and
            beneficiary.user_id == user_id):
            return {"error": "beneficiary already exists for this account", "status_code": 403}

    user = get_user_by_id(user_id)
    if user is None:
        return {"error": "User not found", "status_code": 404}
    
    # himself account cannot be a beneficiary
    if account.user_id == user_id:
        return {"error": "Your account cannot be a self beneficiary", "status_code": 403}
    if account.iban == iban:
        return {"error": "Your account cannot be a self beneficiary", "status_code": 403}

    beneficiary = Beneficiary(
        account_id=account_id,
        first_name=first_name,
        last_name=last_name,
        iban=iban,
        user_id=user_id
    )
    beneficiaries.append(beneficiary)

    return {
        "message": "beneficiary added successfully",
        "beneficiary_id": beneficiary.id,
        "status_code": 200
    }

def get_beneficiaries_by_account(account_id: str) -> List[Beneficiary]:
    account = get_account_by_id(account_id)
    if account is None:
        return []

    account_beneficiaries = [
        beneficiary for beneficiary in beneficiaries
        if beneficiary.account_id == account_id
    ]

    return account_beneficiaries

def get_beneficiaries_by_user(user_id: str) -> List[Beneficiary]:

    user_accounts = get_accounts(user_id)
    if not user_accounts:
        return []

    user_beneficiaries = []
    for account in user_accounts:
        account_beneficiaries = get_beneficiaries_by_account(account.id)
        user_beneficiaries.extend(account_beneficiaries)

    return user_beneficiaries

def get_beneficiary(beneficiary_id: str) -> Optional[Beneficiary]:
    for beneficiary in beneficiaries:
        if beneficiary.id == beneficiary_id:
            return beneficiary
    return None

def remove_beneficiary(account_id: str, beneficiary_id: str) -> dict:
    global beneficiaries

    account = get_account_by_id(account_id)
    if account is None:
        return {"error": "Account not found", "status_code": 404}

    for i, beneficiary in enumerate(beneficiaries):
        if beneficiary.id == beneficiary_id and beneficiary.account_id == account_id:
            beneficiaries.pop(i)
            return {"message": "beneficiary removed successfully", "status_code": 200}

    return {"error": "beneficiary not found or doesn't belong to this account", "status_code": 404}
