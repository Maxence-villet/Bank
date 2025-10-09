from api.entities.transaction import Transaction
from models.account import Account
from models.transaction import *
from api.entities.transaction_status import TransactionStatus
from api.crud.account_crud import get_account_by_id, get_account_balance
from sqlmodel import Session, select
from typing import List
from uuid import uuid4
from db.database import engine
from api.entities.transaction import mark_cancelled

def create_transaction(sender_id: str, receiver_id: str, amount: int) -> Transaction:
    if not amount.is_integer():
        raise ValueError("Le montant doit être un entier.")
    
    if amount <= 0:
        raise ValueError("Le montant doit être positif.")

    if get_account_by_id(sender_id) is None:
        raise ValueError(f"L'utilisateur {sender_id} n'existe pas.")

    if get_account_by_id(receiver_id) is None:
        raise ValueError(f"L'utilisateur {receiver_id} n'existe pas.")

    balance = get_account_balance(sender_id)
    if balance is None or balance < int(amount):
        raise ValueError("Fonds insuffisants.")

    tx = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount=amount, uuid_transaction=str(uuid4()))
    
    return {f"message":tx, "status_code": 200}



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

 
def get_transaction_details(session: Session, transaction_id: str, transactions: List[Transaction]) -> Transaction:

    for tx in transactions:
        if tx.uuid_transaction == transaction_id:
            return tx
    
    raise ValueError(f"La transaction {transaction_id} recherchée n'est pas présente")