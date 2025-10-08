import time
import threading
import asyncio
from datetime import datetime
from transaction import Transaction

# --- Gestion de l’exécution différée ---
class TransactionScheduler:
    def __init__(self, users):
        self.users = users
        self.pending_transactions: list[Transaction] = []
        self.failed_transactions: list[Transaction] = []
        self.succes_transactions: list[Transaction] = []
        self.cancel_transactions: list[Transaction] = []

        self.lock = threading.Lock()
        self._stop_event = threading.Event()
        self.delay = 5 # délai en secondes avant exécution

        # Thread de vérification
        self.thread = threading.Thread(target=self._cron_loop, daemon=True)
        self.thread.start()

    def add_transaction(self, trans: Transaction):
    
        with self.lock:
            self.pending_transactions.append(trans)
            print(f"Transaction {trans.uuid_transaction} programmée ({self.delay}s)")

    def cancel_transaction(self, trans_id: str):
   
        with self.lock:
            for trans in list(self.pending_transactions):
                if trans.uuid_transaction == trans_id and not trans.completed:
                    trans.mark_cancelled()
                    self.pending_transactions.remove(trans)
                    self.cancel_transactions.append(trans)
                    print(f"Transaction {trans_id} annulée")
                    break

    def _cron_loop(self):
     
        while not self._stop_event.is_set():
            now = datetime.now()
            with self.lock:
                for trans in list(self.pending_transactions):  # copie car on peut retirer pendant la boucle
                    if trans.cancelled or trans.completed or trans.failed:
                        continue

                    elapsed = (now - trans.pending_at).total_seconds()
                    if elapsed >= self.delay:
                        asyncio.run(self._execute(trans))
                        self.pending_transactions.remove(trans)
                        self.succes_transactions.append(trans)
                        
            time.sleep(2)  # vérifie toutes les 2 secondes

    async def _execute(self, trans: Transaction):
  
        sender = self.users[trans.sender_id]
        receiver = self.users[trans.receiver_id]

        if sender["balance"] >= trans.amount:
            sender["balance"] -= trans.amount
            receiver["balance"] += trans.amount
            trans.mark_completed()

            print(f" {trans.amount}€ transférés de {trans.sender_id} -> {trans.receiver_id}")
        else:
            trans.mark_failed()
            print(f" Fonds insuffisants ({sender['balance']}€)")

    def stop(self):
     
        self._stop_event.set()
        self.thread.join()







    



