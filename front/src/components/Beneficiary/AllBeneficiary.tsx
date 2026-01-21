import Beneficiary from "./Beneficiary";

interface BeneficiaryType {
    id: string;
    name: string;
    iban: string;
}

interface AllBeneficiaryProps {
    beneficiaries: BeneficiaryType[];
    onDelete: () => void;
}

function AllBeneficiary({ beneficiaries, onDelete }: AllBeneficiaryProps) {
    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-3xl gap-8">
                {beneficiaries.map((beneficiary) => (
                    <Beneficiary
                        key={beneficiary.id}
                        id={beneficiary.id}
                        name={beneficiary.name}
                        iban={beneficiary.iban}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    )
}

export default AllBeneficiary;