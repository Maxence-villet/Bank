import DeleteBeneficiary from "./DeleteBeneficiary";
import "../../assets/CreditCardButton.svg"

interface BeneficiaryType {
    id: string,
    name: string,
    iban: string,
    onDelete?: () => void;
}

interface BeneficiaryProps extends BeneficiaryType {}

function Beneficiary({ id, name, iban, onDelete }: BeneficiaryProps) {
    return (
        <>
            <div className="text-left flex flex-col gap-4 background-white border-0 rounded-2xl p-6 bg-white max-w-2xl">
                <h2 className="text-xl">{name}</h2>
                <p className="text-gray-400">{iban}...</p>
                <div className="font-bold flex flex-row gap-4">
                    <DeleteBeneficiary id={id} onDelete={onDelete} />
                </div>
            </div>
        </>
    );
}

export default Beneficiary;