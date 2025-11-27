import { useEffect, useState } from "react";
import AddBeneficiary from "../../components/Beneficiary/addBeneficiary";

function Beneficiary() {
    const [totalAccounts, setTotalAccounts] = useState(0);

    function getTotal () {
        setTotalAccounts(1243.45)
    }

    useEffect(() => {
        getTotal();
    }, []);

    return (
        <div className="pr-7 pl-16">
            <div className="flex flex-row justify-between items-center mb-12">
                <div className="text-left flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Mes beneficiaires</h1>
                    <div className="text-xl flex flex-column gap-1 text-gray-400">
                        <p>Totale des actifs:</p>
                        <h3 className="font-bold">{totalAccounts}€</h3>   
                    </div>
                </div>
                <AddBeneficiary />
            </div>
        </div>
    );
}

export default Beneficiary;