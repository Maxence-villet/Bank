from datetime import datetime
from uuid import uuid4
from models.account import Account
from utils.iban_generator import iban_generator
from typing import Optional


class CurrentAccount:
    @staticmethod
    def create(user_id: str, name: str = "Compte Courant") -> Account:
        account = Account(user_id, id="C" + str(uuid4()), name=name)
        return account
    