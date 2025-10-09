from api.entities.transaction import Transaction
from api.shemas.transaction_model import TransactionBaseModel
from models.transaction import *
from api.entities.transaction_status import TransactionStatus
from api.crud.account_crud import get_account_by_id
from sqlmodel import Session, select, or_
from typing import List
from uuid import uuid4
from db.database import engine

def create_transaction(sender_id: str, receiver_id: str, amount: int) -> dict:
    # --- Validations (inchangées) ---
    if amount < 1:
        return {"error": "Amount cannot be lower than 1 cent.", "status_error": 403}

    receiver_account = get_account_by_id(receiver_id)
    if receiver_account is None:
        return {"error": "The receiver doens't exist", "status_error": 404}
    
    sender_account = get_account_by_id(sender_id)
    if sender_account is None:
        return {"error": "The sender doesn't exist", "status_error": 404}
    
    balance = sender_account.amount 
    if balance is None or balance < int(amount):
        return {"error": "The sender don't have enough money", "status_error": 403}       

    # --- Création de l'Entity Transaction ---
    tx = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount= amount, uuid_transaction=str(uuid4()))
    # --- Insertion dans la DB (Nouveau Code) ---
    with Session(engine) as db:
        tx_model = TransactionModel.model_validate(tx)
        db.add(tx_model)
        db.commit()
        db.refresh(tx_model)
        inserted_tx = Transaction(**tx_model.model_dump())

    return {"message": inserted_tx, "status_code": 200}


def finalize_transaction( uuid_transaction: str, confirmed: bool):
    with Session(engine) as db:
        statement = select(TransactionModel).where(TransactionModel.uuid_transaction == uuid_transaction)
        tx_model = db.exec(statement).first()

        if tx_model is None:
            raise ValueError(f"Aucune transaction trouvée avec l'UUID {uuid_transaction}.")

        if tx_model.status != TransactionStatus.pending:
            raise ValueError(f"La transaction {uuid_transaction} est déjà finalisée.")

        tx_entity = Transaction(
            sender_id=tx_model.sender_id,
            receiver_id=tx_model.receiver_id,
            amount=tx_model.amount,
            uuid_transaction=tx_model.uuid_transaction,
            pending_at=tx_model.pending_at,
            completed_at=tx_model.completed_at,
            failed_at=tx_model.failed_at,
            cancelled_at=tx_model.cancelled_at,
            status=tx_model.status,
        )

        if confirmed:
            #tu valide la thune
            tx_entity.mark_completed()
        else:
            #tu rend l argent
            tx_entity.mark_cancelled()

        tx_model.status = tx_entity.status
        tx_model.completed_at = tx_entity.completed_at
        tx_model.failed_at = tx_entity.failed_at
        tx_model.cancelled_at = tx_entity.cancelled_at

        db.add(tx_model)
        db.commit()

    return tx_entity

def  get_transactions(account_id: str) -> List[Transaction]:
    with Session(engine) as session:
        statement = select(TransactionModel).where(
            (TransactionModel.sender_id == account_id) | (TransactionModel.receiver_id == account_id)
        )
        tx_models = session.exec(statement).all()

        transactions = [
            TransactionBaseModel(
                uuid_transaction=tx_model.uuid_transaction,
                sender_id=tx_model.sender_id,
                receiver_id=tx_model.receiver_id,
                amount=tx_model.amount
            )
            for tx_model in tx_models
        ]
        print(transactions)
        return transactions


def get_transaction_details(transaction_id: str) -> Transaction:
    with Session(engine) as session:
        statement = select(TransactionModel).where(TransactionModel.uuid_transaction == transaction_id)
        tx_model = session.exec(statement).all()
        if tx_model is None or len(tx_model) == 0:
            return {"message": "La transaction recherchée n'est pas présente", "status_error": 404}

        return tx_model[0]