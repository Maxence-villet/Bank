from fastapi import APIRouter, HTTPException
from crud.beneficiaire_crud import (
    add_beneficiaire,
    get_beneficiaires_by_account,
    get_beneficiaires_by_user,
    get_beneficiaire,
    remove_beneficiaire
)

router = APIRouter(prefix="/beneficiaires", tags=["beneficiaires"])

@router.post("/account/{account_id}")
async def api_add_beneficiaire(account_id: str, first_name: str, last_name: str, iban: str, user_id: str):
    message = add_beneficiaire(account_id, first_name, last_name, iban, user_id)
    return message

@router.get("/account/{account_id}")
async def api_get_beneficiaires_by_account(account_id: str):
    """
    Récupère tous les bénéficiaires d'un compte spécifique.
    """
    beneficiaires = get_beneficiaires_by_account(account_id)
    beneficiaires_list = []
    for beneficiaire in beneficiaires:
        if beneficiaire.account_id == account_id:
            beneficiaires_list.append(beneficiaire.to_dict())
    return beneficiaires_list

    

@router.get("/user/{user_id}")
async def api_get_beneficiaires_by_user(user_id: str):
    beneficiaires = get_beneficiaires_by_user(user_id)
    return beneficiaires

@router.get("/{beneficiaire_id}")
async def api_get_beneficiaire(beneficiaire_id: str):
    beneficiaire = get_beneficiaire(beneficiaire_id)
    return beneficiaire

@router.delete("/account/{account_id}/beneficiaire/{beneficiaire_id}")
async def api_remove_beneficiaire(account_id: str, beneficiaire_id: str):
    message = remove_beneficiaire(account_id, beneficiaire_id)
    return message


