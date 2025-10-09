from datetime import date
from uuid import uuid4
from sqlmodel import Field, SQLModel


class DailyDeposit(SQLModel, table=True):

    id: str = Field(default=str(uuid4()), primary_key=True) 
    account_id: str = Field(foreign_key="account.id", index=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    deposit_date: date = Field(default=date.today(), index=True)
    deposited_amount: int = Field(default=0)

    def __init__(self, account_id: str, user_id: str, deposited_amount: int = 0):
        self.id = str(uuid4())
        self.account_id = account_id
        self.user_id = user_id
        self.deposited_amount = deposited_amount
        self.deposit_date = date.today()