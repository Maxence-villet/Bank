from fastapi import APIRouter, HTTPException
from api.crud.beneficiary_crud import (
    add_beneficiary,
    get_beneficiaries_by_user,
    get_beneficiary,
    remove_beneficiary
)

router = APIRouter(prefix="/beneficiaries", tags=["beneficiaries"])

@router.post("/source_user_id/{source_user_id}/destination_account_id/{destination_account_id}")
async def api_add_beneficiary(source_user_id: str, destination_account_id: str, first_name: str, last_name: str, iban: str):
    message = add_beneficiary(source_user_id, destination_account_id, first_name, last_name, iban)
    return message

@router.get("/source_user_id/{source_user_id}")
async def api_get_beneficiaries_by_user(source_user_id: str):
    beneficiaries = get_beneficiaries_by_user(source_user_id)
    return beneficiaries

@router.get("/beneficiary/{beneficiary_id}")
async def api_get_beneficiary(beneficiary_id: str):
    beneficiary = get_beneficiary(beneficiary_id)
    return beneficiary

@router.delete("/source_user_id/{source_usser_id}/beneficiary/{beneficiary_id}/destination_account_id/{destination_account_id}")
async def api_remove_beneficiary(source_user_id: str, beneficiary_id: str, destination_account_id: str):
    message = remove_beneficiary(source_user_id, beneficiary_id, destination_account_id)
    return message


