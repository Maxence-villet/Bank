from api.entities.transaction import Transaction
from models.transaction import *
from api.entities.transaction_status import TransactionStatus
from api.crud.account_crud import get_account_by_id
from sqlmodel import Session, select
from typing import List
from uuid import uuid4
from db.database import engine

def create_transaction(sender_id: str, receiver_id: str, amount: int) -> dict:
    # --- Validations (inchangées) ---
    if not isinstance(amount, int):
         raise ValueError("Le montant doit être un entier.")
    
    if amount <= 0:
        raise ValueError("Le montant doit être positif.")

    receiver_account = get_account_by_id(receiver_id)
    if receiver_account is None:
        raise ValueError(f"L'utilisateur (destinataire) {receiver_id} n'existe pas.")
    
    sender_account = get_account_by_id(sender_id)
    if sender_account is None:
        raise ValueError(f"L'utilisateur (expéditeur) {sender_id} n'existe pas.")
    
    balance = sender_account.amount 
    if balance is None or balance < int(amount):
        raise ValueError("Fonds insuffisants.")        

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


def finalize_transaction(session: Session, uuid_transaction: str, confirmed: bool):

    statement = select(TransactionModel).where(TransactionModel.uuid_transaction == uuid_transaction)
    tx_model = session.exec(statement).scalar_one_or_none()

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
        tx_entity.mark_completed()
    else:
        tx_entity.mark_cancelled()

    tx_model.status = tx_entity.status
    tx_model.completed_at = tx_entity.completed_at
    tx_model.failed_at = tx_entity.failed_at
    tx_model.cancelled_at = tx_entity.cancelled_at

    session.add(tx_model)
    session.commit()

    return tx_entity

def  get_transactions(account_id: str) -> List[Transaction]:

    with Session(engine) as session:
        statement = select(TransactionModel).where(
            (TransactionModel.sender_id == account_id) | (TransactionModel.receiver_id == account_id)
        )
        tx_models = session.exec(statement).all()

        transactions = [
            Transaction(
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
            for tx_model in tx_models
        ]

    return transactions


def get_transaction_details(session: Session, transaction_id: str, transactions: List[Transaction]) -> Transaction:

    for tx in transactions:
        if tx.uuid_transaction == transaction_id:
            return tx
    
    raise ValueError(f"La transaction {transaction_id} recherchée n'est pas présente")