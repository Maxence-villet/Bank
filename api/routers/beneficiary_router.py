from fastapi import APIRouter, HTTPException
from api.crud.beneficiary_crud import (
    add_beneficiary,
    get_beneficiaries_by_account,
    get_beneficiaries_by_user,
    get_beneficiary,
    remove_beneficiary
)

router = APIRouter(prefix="/beneficiaries", tags=["beneficiaries"])

@router.post("/account/{account_id}")
async def api_add_beneficiary(account_id: str, first_name: str, last_name: str, iban: str, user_id: str):
    message = add_beneficiary(account_id, first_name, last_name, iban, user_id)
    return message

@router.get("/account/{account_id}")
async def api_get_beneficiaries_by_account(account_id: str):
    """
    Récupère tous les bénéficiaires d'un compte spécifique.
    """
    beneficiaries = get_beneficiaries_by_account(account_id)
    beneficiaries_list = []
    for beneficiary in beneficiaries:
        if beneficiary.account_id == account_id:
            beneficiaries_list.append(beneficiary.to_dict())
    return beneficiaries_list

    

@router.get("/user/{user_id}")
async def api_get_beneficiaries_by_user(user_id: str):
    beneficiaries = get_beneficiaries_by_user(user_id)
    return beneficiaries

@router.get("/{beneficiary_id}")
async def api_get_beneficiary(beneficiary_id: str):
    beneficiary = get_beneficiary(beneficiary_id)
    return beneficiary

@router.delete("/account/{account_id}/beneficiary/{beneficiary_id}")
async def api_remove_beneficiary(account_id: str, beneficiary_id: str):
    message = remove_beneficiary(account_id, beneficiary_id)
    return message


