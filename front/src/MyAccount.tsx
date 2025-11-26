import { useEffect, useState } from "react";
import AllAccounts from "./components/Account/AllAccounts";

function MyAccount() {
    const [totalAccounts, setTotalAccounts] = useState(0);

    function getTotal () {
        setTotalAccounts(1243.45)
    }

    useEffect(() => {
        getTotal();
    }, []);

    return (
        <div className="bg-gray-100 py-16 pr-7 pl-16">
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
            
            <AllAccounts />
        </div>
    );
}

export default MyAccount;