import { useEffect, useState } from "react";
import Account from "../Account/Account";

interface AccountType {
    id: number,
    name: string,
    amount: number,
    iban: string,
}

function AllAccounts() {
    const [accounts, setAccounts] = useState<AccountType[]>([]);

    function getAccounts () {
        const nouveauxComptes = [
            { id: 1, name: "Compte Chèques", amount: 1500, iban: "FR76 7003 6010 5678" },
            { id: 2, name: "Compte Épargne", amount: 5000, iban: "FR76 7003 6010 1234" },
            { id: 3, name: "Compte Investissement", amount: 12000, iban: "FR76 7003 6010 9876" },
        ];

        setAccounts(nouveauxComptes)
    }

    useEffect(() => {
        getAccounts();
    }, []);

    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl gap-8">
                {accounts.map((account) => (
                    <Account 
                        key={account.id}
                        id={account.id}
                        name={account.name}
                        amount={account.amount}
                        iban={account.iban}
                    />
                ))}
            </div>
        </>
    )
}

export default AllAccounts;