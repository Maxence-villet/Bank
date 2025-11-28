from api.entities.transaction import Transaction
from api.shemas.transaction_model import TransactionBaseModel
from models.transaction import *
from models.account import Account
from api.entities.transaction_status import TransactionStatus
from api.crud.account_crud import get_account_by_id, get_current_account
from sqlmodel import Session, select, or_, desc
from typing import List
from uuid import uuid4
from db.database import engine

def create_transaction(sender_id: str, receiver_id: str, amount: int, description: str = "") -> dict:
    # --- Validations (inchangées) ---
    if amount < 1:
        return {"error": "Amount cannot be lower than 1 cent.", "status_error": 403}

    receiver_account = get_account_by_id(receiver_id)
    if receiver_account is None:
        return {"error": "The receiver doens't exist", "status_error": 404}

    # Pour les transactions système (bonus de bienvenue, dépôts), l'expéditeur peut être "SYSTEM_BANK"
    if sender_id != "SYSTEM_BANK":
        sender_account = get_account_by_id(sender_id)
        if sender_account is None:
            return {"error": "The sender doesn't exist", "status_error": 404}

        balance = sender_account.amount
        if balance is None or balance < int(amount):
            return {"error": "The sender don't have enough money", "status_error": 403}
    else:
        sender_account = None  # Pas de compte expéditeur pour les transactions système       

    # --- Création de l'Entity Transaction ---
    tx = Transaction(sender_id=sender_id, receiver_id=receiver_id, amount= amount, uuid_transaction=str(uuid4()), description=description)
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
            return {"error": f"Aucune transaction trouvée avec l'UUID {uuid_transaction}.", "status_error": 403}
        

        if tx_model.status != TransactionStatus.pending:
             return {"error": f"La transaction {uuid_transaction} est déjà finalisée.", "status_error": 403}

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
            # Valider la transaction et mettre à jour les soldes
            tx_entity.mark_completed()

            # Récupérer et mettre à jour les soldes des comptes
            sender_account = db.get(Account, tx_entity.sender_id) if tx_entity.sender_id != "SYSTEM_BANK" else None
            receiver_account = db.get(Account, tx_entity.receiver_id)

            if receiver_account is None:
                return {"error": "Compte destinataire introuvable.", "status_code": 403}
            
            if tx_entity.sender_id != "SYSTEM_BANK" and sender_account is None:
                return {"error": "Compte expéditeur introuvable.", "status_code": 403}

            # Ne débiter que si ce n'est pas une transaction système
            if sender_account is not None:
                sender_account.amount -= tx_entity.amount
            receiver_account.amount += tx_entity.amount

            # Vérifier si le compte destinataire est un compte ordinaire avec plafond
            if receiver_account.is_ordinary_account:
                surplus = receiver_account.amount - 50000000
                if surplus > 0:
                    # Récupérer le compte principal du propriétaire
                    current_account_obj = get_current_account(receiver_account.user_id)
                    current_account = db.get(Account, current_account_obj.id) if current_account_obj else None

                    if current_account is not None:
                        # Créer une nouvelle transaction pour déplacer le surplus vers le compte principal
                        surplus_tx = Transaction(
                            sender_id=receiver_account.id,
                            receiver_id=current_account.id,
                            amount=surplus,
                            uuid_transaction=str(uuid4()),
                            description="Transfert automatique du surplus vers le compte principal"
                        )
                        surplus_tx_model = TransactionModel.model_validate(surplus_tx)
                        db.add(surplus_tx_model)

                        # Finaliser immédiatement la transaction de surplus
                        surplus_tx.mark_completed()
                        surplus_tx_model.status = surplus_tx.status
                        surplus_tx_model.completed_at = surplus_tx.completed_at

                        # Mettre à jour les soldes pour le transfert du surplus
                        receiver_account.amount -= surplus
                        current_account.amount += surplus
        else:
            # Annuler la transaction
            tx_entity.mark_cancelled()

        tx_model.status = tx_entity.status
        tx_model.completed_at = tx_entity.completed_at
        tx_model.failed_at = tx_entity.failed_at
        tx_model.cancelled_at = tx_entity.cancelled_at

        db.add(tx_model)
        db.commit()

        return tx_entity


def create_welcome_bonus(account_id: str, user_name: str) -> bool:
    """
    Crée un virement de bienvenue de 200€ vers le compte spécifié.
    """
    try:
        # Créer une transaction depuis un compte système
        welcome_tx = Transaction(
            sender_id="SYSTEM_BANK",  # Compte système
            receiver_id=account_id,
            amount=10000,  # 100€ en centimes
            uuid_transaction=str(uuid4()),
            description=f"🎉 Bienvenue {user_name} ! Cadeau de bienvenue de 100€ pour commencer votre aventure bancaire."
        )

        with Session(engine) as db:
            # Créer et sauvegarder la transaction
            tx_model = TransactionModel.model_validate(welcome_tx)
            db.add(tx_model)

            # Finaliser immédiatement la transaction de bienvenue
            welcome_tx.mark_completed()
            tx_model.status = welcome_tx.status
            tx_model.completed_at = welcome_tx.completed_at

            # Créditer le compte destinataire
            account = db.get(Account, account_id)
            if account:
                account.amount += 10000  # 100€ en centimes
                db.add(account)

            db.commit()

        return True
    except Exception as e:
        print(f"Erreur lors de la création du bonus de bienvenue: {e}")
        return False


def  get_transactions(account_id: str) -> List[TransactionBaseModel]:
    with Session(engine) as session:
        statement = select(TransactionModel).where(
            (TransactionModel.sender_id == account_id) | (TransactionModel.receiver_id == account_id)
        ).order_by(desc(TransactionModel.completed_at), desc(TransactionModel.failed_at), desc(TransactionModel.cancelled_at), desc(TransactionModel.pending_at))
        tx_models = session.exec(statement).all()

        transactions = [
            TransactionBaseModel(
                uuid_transaction=tx_model.uuid_transaction,
                sender_id=tx_model.sender_id,
                receiver_id=tx_model.receiver_id,
                amount=tx_model.amount,
                description=tx_model.description,
                peding_at=tx_model.pending_at,
                completed_at=tx_model.completed_at,
                failed_at=tx_model.failed_at,
                cancelled_at=tx_model.cancelled_at,
                status=tx_model.status, 
            )
            for tx_model in tx_models
        ]
        print(f"Transactions pour le compte {account_id} : {tx_models}")
        return transactions


def get_transaction_details(transaction_id: str) -> dict:
    with Session(engine) as session:
        statement = select(TransactionModel).where(TransactionModel.uuid_transaction == transaction_id)
        tx_model = session.exec(statement).first()
        if tx_model is None:
            return {"message": "La transaction recherchée n'est pas présente", "status_error": 404}

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

        return {"message": tx_entity, "status_code": 200}