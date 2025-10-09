from datetime import datetime, timedelta
from sqlmodel import Session, select
from db.database import engine
from models.transaction import TransactionModel
from api.entities.transaction import Transaction
from api.crud.transaction_action import finalize_transaction
from api.entities.transaction_status import TransactionStatus

class TransactionScheduler:
    def __init__(self, delay: int = 5):
        self.delay = delay  

    async def check_pending_transactions(self):

        now = datetime.now()
        threshold = now - timedelta(seconds=self.delay)

        with Session(engine) as session:
            stmt = (
                select(TransactionModel)
                .where(TransactionModel.status == TransactionStatus.pending)
                .where(TransactionModel.pending_at <= threshold)
            )
            pending_transactions = session.exec(stmt).all()

            if not pending_transactions:
                return  

            for tx_model in pending_transactions:
                tx_entity = Transaction(
                    sender_id=tx_model.sender_id,
                    receiver_id=tx_model.receiver_id,
                    amount=tx_model.amount,
                    uuid_transaction=tx_model.uuid_transaction,
                    pending_at=tx_model.pending_at,
                    completed_at=tx_model.completed_at,
                    failed_at=tx_model.failed_at,
                    cancelled_at=tx_model.cancelled_at,
                )

                finalize_transaction(tx_entity.uuid_transaction, confirmed=True)
