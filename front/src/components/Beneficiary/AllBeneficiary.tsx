import { useEffect, useState } from "react";
import Beneficiary from "./Beneficiary";

interface BeneficiaryType {
    id: number,
    name: string,
    iban: string,
}

function AllBeneficiary() {
    const [beneficiarys, setBeneficiarys] = useState<BeneficiaryType[]>([]);

    function getBeneficiary () {
        const nouveauxComptes = [
            { id: 1, name: "Compte Chèques", iban: "FR76 7003 6010 5678" },
            { id: 2, name: "Compte Épargne", iban: "FR76 7003 6010 1234" },
            { id: 3, name: "Compte Investissement", iban: "FR76 7003 6010 9876" },
        ];

        setBeneficiarys(nouveauxComptes)
    }

    useEffect(() => {
        getBeneficiary();
    }, []);

    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-3xl gap-8">
                {beneficiarys.map((beneficiary) => (
                    <Beneficiary
                        key={beneficiary.id}
                        id={beneficiary.id}
                        name={beneficiary.name}
                        iban={beneficiary.iban}
                    />
                ))}
            </div>
        </>
    )
}

export default AllBeneficiary;