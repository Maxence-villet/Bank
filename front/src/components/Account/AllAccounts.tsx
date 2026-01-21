import Account from "./Account";

interface AccountType {
    id: string;
    name: string;
    amount: number;
    iban: string;
}

interface AllAccountsProps {
    accounts: AccountType[];
    onClose?: () => void;
}

function AllAccounts({ accounts, onClose }: AllAccountsProps) {
    const formatIban = (iban: string) => {
        if (!iban) return '';
        const first16 = iban.slice(0, 16);
        return first16.match(/.{1,4}/g)?.join(' ') ?? first16;
    }

    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl gap-8">
                {accounts.map((account) => (
                    <Account 
                        key={account.id}
                        id={account.id}
                        name={account.name}
                        amount={account.amount / 100} // Divide by 100 for euros
                        iban={formatIban(account.iban)}
                        onClose={onClose}
                    />
                ))}
            </div>
        </>
    )
}

export default AllAccounts;