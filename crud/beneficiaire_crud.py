from models.beneficiaire import Beneficiaire
from typing import List, Optional
from crud.account_crud import get_accounts, get_account_by_id
from crud.user_crud import get_user_by_id

beneficiaires: List[Beneficiaire] = []

def add_beneficiaire(account_id: str, first_name: str, last_name: str, iban: str, user_id: str) -> dict:
    account = get_account_by_id(account_id)
    if account is None:
        return {"error": "Account not found", "status_code": 404}

    for beneficiaire in beneficiaires:
        if (beneficiaire.account_id == account_id and
            beneficiaire.first_name == first_name and
            beneficiaire.last_name == last_name and
            beneficiaire.iban == iban and
            beneficiaire.user_id == user_id):
            return {"error": "Beneficiaire already exists for this account", "status_code": 403}

    user = get_user_by_id(user_id)
    if user is None:
        return {"error": "User not found", "status_code": 404}
    
    # himself account cannot be a beneficiary
    if account.user_id == user_id:
        return {"error": "Your account cannot be a self beneficiary", "status_code": 403}
    if account.iban == iban:
        return {"error": "Your account cannot be a self beneficiary", "status_code": 403}

    beneficiaire = Beneficiaire(
        account_id=account_id,
        first_name=first_name,
        last_name=last_name,
        iban=iban,
        user_id=user_id
    )
    beneficiaires.append(beneficiaire)

    return {
        "message": "Beneficiaire added successfully",
        "beneficiaire_id": beneficiaire.id,
        "status_code": 200
    }

def get_beneficiaires_by_account(account_id: str) -> List[Beneficiaire]:
    account = get_account_by_id(account_id)
    if account is None:
        return []

    account_beneficiaires = [
        beneficiaire for beneficiaire in beneficiaires
        if beneficiaire.account_id == account_id
    ]

    return account_beneficiaires

def get_beneficiaires_by_user(user_id: str) -> List[Beneficiaire]:

    user_accounts = get_accounts(user_id)
    if not user_accounts:
        return []

    user_beneficiaires = []
    for account in user_accounts:
        account_beneficiaires = get_beneficiaires_by_account(account.id)
        user_beneficiaires.extend(account_beneficiaires)

    return user_beneficiaires

def get_beneficiaire(beneficiaire_id: str) -> Optional[Beneficiaire]:
    for beneficiaire in beneficiaires:
        if beneficiaire.id == beneficiaire_id:
            return beneficiaire
    return None

def remove_beneficiaire(account_id: str, beneficiaire_id: str) -> dict:
    global beneficiaires

    account = get_account_by_id(account_id)
    if account is None:
        return {"error": "Account not found", "status_code": 404}

    for i, beneficiaire in enumerate(beneficiaires):
        if beneficiaire.id == beneficiaire_id and beneficiaire.account_id == account_id:
            beneficiaires.pop(i)
            return {"message": "Beneficiaire removed successfully", "status_code": 200}

    return {"error": "Beneficiaire not found or doesn't belong to this account", "status_code": 404}
