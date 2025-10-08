from typing import Dict, List, Optional
from models.account import Account

class DepositService:
    MAX_DAILY_DEPOSIT: int = 200000  # 2000€ en centimes

    def __init__(self, daily_deposits: Dict[str, int], accounts: List[Account]):
        self.daily_deposits = daily_deposits
        self.accounts = accounts

    def validate_deposit(self, account_id: str, amount: int) -> Optional[str]:
        """
        Valide si un dépôt peut être effectué.
        Retourne un message d'erreur si invalide, None si valide.
        """
        if amount < 1:
            return "Deposit failed. Amount is too low."

        # Vérifier que le compte existe
        account = self._find_account(account_id)
        if account is None:
            return "Account not found."

        # Vérifier la limite journalière
        current_daily_deposit = self.daily_deposits.get(account_id, 0)
        if current_daily_deposit + amount > self.MAX_DAILY_DEPOSIT:
            return f"Deposit failed. Amount is too high. Maximum deposit per day is {self.MAX_DAILY_DEPOSIT // 100}€."

        return None  # Dépôt valide

    def execute_deposit(self, account_id: str, amount: int) -> bool:
        """
        Exécute le dépôt d'argent.
        Suppose que validate_deposit a été appelée et a retourné None.
        """
        account = self._find_account(account_id)
        if account is None:
            return False

        # Créditer le compte
        account.amount += amount

        # Mettre à jour les dépôts journaliers
        if account_id in self.daily_deposits:
            self.daily_deposits[account_id] += amount
        else:
            self.daily_deposits[account_id] = amount

        return True

    def get_daily_deposit(self, account_id: str) -> int:
        """Retourne le montant déposé aujourd'hui pour un compte."""
        return self.daily_deposits.get(account_id, 0)

    def _find_account(self, account_id: str) -> Optional[Account]:
        """Trouve un compte par son ID."""
        for account in self.accounts:
            if account.id == account_id:
                return account
        return None
        