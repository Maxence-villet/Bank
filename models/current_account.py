from datetime import datetime
from uuid import uuid4
from models.account import Account
from utils.iban_generator import iban_generator


class CurrentAccount:
    @staticmethod
    def create(user_id: str) -> Account:
        account = Account(user_id, str("C" + str(uuid4())))
        return account
    