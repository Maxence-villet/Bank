from models.transaction import Transaction
from typing import Dict, List

class TransactionAction:
    def __init__(self, users: Dict[str, dict]):
        self.users = users
        self.transactions: List[Transaction] = []  

    def create_transaction(self, sender_id: str, receiver_id: str, amount: int) -> Transaction:
        if sender_id not in self.users:
            raise ValueError(f"L'utilisateur {sender_id} n'existe pas.")
        if receiver_id not in self.users:
            raise ValueError(f"L'utilisateur {receiver_id} n'existe pas.")
        if amount <= 0:
            raise ValueError("Le montant doit être positif.")
        if not isinstance(amount, int):
            raise ValueError("Le montant doit être un entier.")

        sender = self.users[sender_id]
        if sender["balance"] < amount:
            raise ValueError("Fonds insuffisants.")

        sender["balance"] -= amount
        tx = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount=amount)
        tx.mark_pending()  
        self.transactions.append(tx)  
        print(f"{amount}€ réservés sur le compte de {sender_id}")
        return tx

    def finalize_transaction(self, tx: Transaction, confirmed: bool):
       
        if tx.is_finalized():
            raise ValueError(f"La transaction {tx.uuid_transaction} est déjà finalisée.")

        receiver = self.users.get(tx.receiver_id)
        if not receiver:
            raise ValueError(f"L'utilisateur destinataire {tx.receiver_id} n'existe pas.")

        if confirmed:
            receiver["balance"] += tx.amount
            tx.mark_completed()
            print(f"Transaction {tx.uuid_transaction} confirmée et exécutée.")
        else:
            sender = self.users.get(tx.sender_id)
            if not sender:
                raise ValueError(f"L'utilisateur expéditeur {tx.sender_id} n'existe pas.")
            sender["balance"] += tx.amount
            tx.mark_cancelled()
            print(f"Transaction {tx.uuid_transaction} annulée et remboursée.")

    def get_transactions(self, account_id : str):
        
        transaction_history = []

        for transaction in self.transactions :
            if transaction.receiver_id == account_id or transaction.sender_id == account_id :
                transaction_history.append(transaction)
        if transaction_history == [] :
            raise ValueError(f"Il n'y a aucune transactions lié au compte")
        return transaction_history
    
    def get_transaction_details(self, transaction_id : str):

        for transaction in self.transactions :
            if transaction.uuid_transaction == transaction_id :
                return transaction
        raise ValueError(f"La transaction rechercher n'est pas présente")



        
            