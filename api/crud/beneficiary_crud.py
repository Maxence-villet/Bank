from models.beneficiary import Beneficiary
from typing import List, Optional
from api.crud.account_crud import get_account_by_id, get_accounts
from api.crud.user_crud import get_user_by_id
from sqlmodel import Session, select
from db.database import engine



def add_beneficiary(source_user_id: str, destination_account_id: str, first_name: str, last_name: str, iban: str) -> dict:
    account = get_account_by_id(destination_account_id)
    if account is None:
        return {"error": "Account not found", "status_code": 404}
  
    source_user = get_user_by_id(source_user_id)
    if source_user is None:
        return {"error": "User not found", "status_code": 404}

    with Session(engine) as db:
        statement = select(Beneficiary).where(
            Beneficiary.source_user_id == source_user_id and
            Beneficiary.first_name == first_name and
            Beneficiary.last_name == last_name and
            Beneficiary.iban == iban and
            Beneficiary.destination_account_id == destination_account_id
        )

        existing_beneficiary = db.exec(statement).first()
        if existing_beneficiary:
            return {"error": "beneficiary already exists for this account", "status_code": 403}

        source_accounts = get_accounts(source_user_id)
        for account in source_accounts:
            if account.id == destination_account_id:
                return {"error": "Your account cannot be a self beneficiary", "status_code": 403}
            if account.iban == iban:
                return {"error": "Your account cannot be a self beneficiary", "status_code": 403}

        new_beneficiary = Beneficiary(
            source_user_id=source_user_id,
            first_name=first_name,
            last_name=last_name,
            iban=iban,
            destination_account_id=destination_account_id
        )
        db.add(new_beneficiary)
        db.commit()
        db.refresh(new_beneficiary)

        return {
            "message": "beneficiary added successfully",
            "beneficiary_id": new_beneficiary.id,
            "status_code": 200
        }

def get_beneficiaries_by_user(source_user_id: str) -> List[Beneficiary]:
    with Session(engine) as db:
        statement = select(Beneficiary).where(Beneficiary.source_user_id == source_user_id)
        beneficiaries = db.exec(statement).all()
        return beneficiaries

def get_beneficiary(beneficiary_id: str) -> Optional[Beneficiary]:
    with Session(engine) as db:
        statement = select(Beneficiary).where(Beneficiary.id == beneficiary_id)
        beneficiary = db.exec(statement).first()
        if beneficiary is None:
            return None
        else:
            return beneficiary

def remove_beneficiary(beneficiary_id: str) -> dict:
    if get_beneficiary(beneficiary_id) is None:
        return {"error": "beneficiary not found", "status_code": 404}
    
    with Session(engine) as db:
        statement = select(Beneficiary).where(
            Beneficiary.id == beneficiary_id
        )
        beneficiary = db.exec(statement).first()

        if beneficiary:
            db.delete(beneficiary)
            db.commit()
            return {"message": "beneficiary removed successfully", "status_code": 200}

        return {"error": "beneficiary not found or doesn't belong to this account", "status_code": 404}