import DeleteBeneficiary from "./DeleteBeneficiary";
import "../../assets/CreditCardButton.svg"


interface BeneficiaryType {
    id: number,
    name: string,
    iban: string,
}

function Beneficiary(beneficiary: BeneficiaryType) {
    return (
        <>
            <div className="text-left flex flex-col gap-4 background-white border-0 rounded-2xl p-6 bg-white max-w-2xl">
                <h2 className="text-xl">{beneficiary.name}</h2>
                <p className="text-gray-400">{beneficiary.iban}...</p>
                <div className="font-bold flex flex-row gap-4">
                    <DeleteBeneficiary id={beneficiary.id}/>
                </div>
            </div>
        </>
    );
}

export default Beneficiary;