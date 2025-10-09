from api.entities.transaction import Transaction
from models.account import Account
from api.entities.transaction_status import TransactionStatus
from api.crud.account_crud import get_account_by_id, get_account_balance, deposit_money
from sqlmodel import Session, select
from typing import List
from uuid import uuid4

def create_transaction(session: Session, sender_id: str, receiver_id: str, amount: float) -> Transaction:
    if not amount.is_integer():
        raise ValueError("Le montant doit être un entier.")

    if get_account_by_id(sender_id) is None:
        raise ValueError(f"L'utilisateur {sender_id} n'existe pas.")

    if get_account_by_id(receiver_id) is None:
        raise ValueError(f"L'utilisateur {receiver_id} n'existe pas.")

    if amount <= 0:
        raise ValueError("Le montant doit être positif.")

    balance = get_account_balance(sender_id)
    if balance is None or balance < int(amount):
        raise ValueError("Fonds insuffisants.")

    deposit_result = deposit_money(sender_id, -int(amount))
    if deposit_result.get("status_code") != 200:
        raise ValueError(f"Échec du débit : {deposit_result.get('error')}")

    tx = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount=amount, uuid_transaction=str(uuid4()))
    
    print(f"{amount}€ réservés sur le compte de {sender_id}")
    return tx

def finalize_transaction(session: Session, tx: Transaction, confirmed: bool):
    if not tx.check_pending():
        raise ValueError(f"La transaction {tx.uuid_transaction} est déjà finalisée.")

    if get_account_by_id(tx.receiver_id) is None:
        raise ValueError(f"L'utilisateur destinataire {tx.receiver_id} n'existe pas.")

    if confirmed:
        receiver = session.exec(select(Account).where(Account.id == tx.receiver_id)).first()
        if not receiver:
            raise ValueError(f"L'utilisateur destinataire {tx.receiver_id} n'existe pas.")
        receiver.amount += tx.amount
        session.add(receiver)
        tx.mark_completed()
        print(f"Transaction {tx.uuid_transaction} confirmée et exécutée.")
    else:
        if get_account_by_id(tx.sender_id) is None:
            raise ValueError(f"L'utilisateur expéditeur {tx.sender_id} n'existe pas.")

        sender = session.exec(select(Account).where(Account.id == tx.sender_id)).first()
        if not sender:
            raise ValueError(f"L'utilisateur expéditeur {tx.sender_id} n'existe pas.")
        sender.amount += tx.amount
        session.add(sender)
        tx.mark_cancelled()
        print(f"Transaction {tx.uuid_transaction} annulée et remboursée.")
    
    session.commit()

def get_transactions(session: Session, account_id: str, transactions: List[Transaction]) -> List[Transaction]:

    if get_account_by_id(account_id) is None:
        raise ValueError(f"L'utilisateur {account_id} n'existe pas.")


    transaction_history = [
        tx for tx in transactions
        if tx.receiver_id == account_id or tx.sender_id == account_id
    ]
    
    if not transaction_history:
        raise ValueError(f"Il n'y a aucune transaction liée au compte {account_id}")
    
    return transaction_history

def get_transaction_details(session: Session, transaction_id: str, transactions: List[Transaction]) -> Transaction:

    for tx in transactions:
        if tx.uuid_transaction == transaction_id:
            return tx
    
    raise ValueError(f"La transaction {transaction_id} recherchée n'est pas présente")