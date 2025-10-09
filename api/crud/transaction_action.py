from api.entities.transaction import Transaction
from api.entities.transaction_status import TransactionStatus
from typing import Dict, List

def create_transaction(users: Dict[str, dict], transactions: List[Transaction], sender_id: str, receiver_id: str, amount: float) -> Transaction:
    if sender_id not in users:
        raise ValueError(f"L'utilisateur {sender_id} n'existe pas.")
    if receiver_id not in users:
        raise ValueError(f"L'utilisateur {receiver_id} n'existe pas.")
    if amount <= 0:
        raise ValueError("Le montant doit être positif.")

    sender = users[sender_id]
    if sender["balance"] < amount:
        raise ValueError("Fonds insuffisants.")

    sender["balance"] -= amount
    tx = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount=amount)
    transactions.append(tx)
    print(f"{amount}€ réservés sur le compte de {sender_id}")
    return tx

def finalize_transaction(users: Dict[str, dict], tx: Transaction, confirmed: bool):
    if not tx.check_pending():
        raise ValueError(f"La transaction {tx.uuid_transaction} est déjà finalisée.")

    receiver = users.get(tx.receiver_id)
    if not receiver:
        raise ValueError(f"L'utilisateur destinataire {tx.receiver_id} n'existe pas.")

    if confirmed:
        receiver["balance"] += tx.amount
        tx.mark_completed()
        print(f"Transaction {tx.uuid_transaction} confirmée et exécutée.")
    else:
        sender = users.get(tx.sender_id)
        if not sender:
            raise ValueError(f"L'utilisateur expéditeur {tx.sender_id} n'existe pas.")
        sender["balance"] += tx.amount
        tx.mark_cancelled()
        print(f"Transaction {tx.uuid_transaction} annulée et remboursée.")

def get_transactions(transactions: List[Transaction], account_id: str) -> List[Transaction]:
    transaction_history = []
    for transaction in transactions:
        if transaction.receiver_id == account_id or transaction.sender_id == account_id:
            transaction_history.append(transaction)
    if not transaction_history:
        raise ValueError(f"Il n'y a aucune transaction liée au compte {account_id}")
    return transaction_history

def get_transaction_details(transactions: List[Transaction], transaction_id: str) -> Transaction:
    for transaction in transactions:
        if transaction.uuid_transaction == transaction_id:
            return transaction
    raise ValueError(f"La transaction {transaction_id} recherchée n'est pas présente")