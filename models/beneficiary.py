from uuid import uuid4
from datetime import datetime
from sqlmodel import Field, SQLModel

class Beneficiary(SQLModel, table=True):
    id: str = Field(default=str(uuid4()), primary_key=True)
    source_user_id: str = Field(foreign_key="user.id")
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    iban: str = Field(index=True)
    destination_account_id: str = Field(index=True, foreign_key="account.id")
    register_at: datetime = Field(default=datetime.now)

    def __init__(self, source_user_id: str, first_name: str, last_name: str, iban: str, destination_account_id: str):
        self.id = str(uuid4())
        self.source_user_id = source_user_id
        self.first_name = first_name
        self.last_name = last_name
        self.iban = iban
        self.destination_account_id = destination_account_id
        self.register_at = datetime.now()
    