from fastapi import APIRouter, HTTPException
from utils.auth import get_current_user
from fastapi import Depends

from api.crud.beneficiary_crud import (
    add_beneficiary,
    get_beneficiaries_by_user,
    get_beneficiary,
    remove_beneficiary
)

router = APIRouter(prefix="/beneficiaries", tags=["beneficiaries"])

@router.post("/source_user_id/{source_user_id}/destination_account_id/{destination_account_id}")
async def api_add_beneficiary(source_user_id: str, destination_account_id: str, first_name: str, last_name: str, iban: str, current_user: str = Depends(get_current_user)):
    message = add_beneficiary(source_user_id, destination_account_id, first_name, last_name, iban)
    return message

@router.get("/source_user_id/{source_user_id}")
async def api_get_beneficiaries_by_user(source_user_id: str, current_user: str = Depends(get_current_user)):
    beneficiaries = get_beneficiaries_by_user(source_user_id)
    return beneficiaries

@router.get("/beneficiary/{beneficiary_id}")
async def api_get_beneficiary(beneficiary_id: str, current_user: str = Depends(get_current_user)):
    beneficiary = get_beneficiary(beneficiary_id)
    return beneficiary

@router.delete("/beneficiary/{beneficiary_id}")
async def api_remove_beneficiary(beneficiary_id: str, current_user: str = Depends(get_current_user)):
    message = remove_beneficiary(beneficiary_id)
    return message


