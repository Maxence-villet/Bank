import TransferConfirmation from '../Shared/TransferConfirmation';

interface Step4ExterneProps {
    onPrevious: () => void;
}

function Step4({ onPrevious }: Step4ExterneProps) {
    const transferAmount = "345";
    const beneficiaryName = "Collocation";

    const steps = [
        { number: 1, title: "Type de virement", isActive: true },
        { number: 2, title: "Bénéficiaire", isActive: true },
        { number: 3, title: "Choisir le montant", isActive: true },
        { number: 4, title: "Confirmation", isActive: true }
    ];

    return (
        <TransferConfirmation
            onPrevious={onPrevious}
            transferAmount={transferAmount}
            beneficiaryName={beneficiaryName}
            steps={steps}
            useCircleIcon={true}
        />
    );
}

export default Step4;