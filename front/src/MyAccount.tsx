import { useEffect, useState } from "react";
import Account from "./components/Account/Account";

interface AccountType {
    id: number,
    name: string,
    amount: number,
    iban: string,
}

function MyAccount() {
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [totalAccounts, setTotalAccounts] = useState(0);

    function getAccounts () {
        const nouveauxComptes = [
            { id: 1, name: "Compte Chèques", amount: 1500, iban: "FR76 7003 6010 5678" },
            { id: 2, name: "Compte Épargne", amount: 5000, iban: "FR76 7003 6010 1234" },
            { id: 3, name: "Compte Investissement", amount: 12000, iban: "FR76 7003 6010 9876" },
        ];

        setAccounts(nouveauxComptes)
    }

    function getTotal () {
        setTotalAccounts(1243.45)
    }

    useEffect(() => {
        getTotal();
        getAccounts();
    }, []);

    return (
        <div className="bg-gray-100 w-full py-16 pr-7 pl-16">
            <div className="flex flex-row justify-between items-center mb-12">
                <div className="text-left flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Mes comptes</h1>
                    <div className="text-xl flex flex-column gap-1 text-gray-400">
                        <p>Totale des actifs:</p>
                        <h3 className="font-bold">{totalAccounts}€</h3>   
                    </div>
                </div>
                <button className="border-2 border-black rounded-md font-bold text-xl px-5 py-3">Ajouter un compte +</button>
            </div>
            {accounts.length > 0 && <Account {...accounts[0]} />}
        </div>
    );
}

export default MyAccount;