import TransferConfirmation from '../Shared/TransferConfirmation';

interface Step3InterneProps {
    onPrevious: () => void;
}

function Step3({ onPrevious }: Step3InterneProps) {
    const transferAmount = "345";
    const beneficiaryName = "Collocation";

    const steps = [
        { number: 1, title: "Type de virement", isActive: true },
        { number: 2, title: "Choisir un compte", isActive: true },
        { number: 3, title: "Confirmation", isActive: true }
    ];

    return (
        <TransferConfirmation
            onPrevious={onPrevious}
            transferAmount={transferAmount}
            beneficiaryName={beneficiaryName}
            steps={steps}
            useCircleIcon={false}
        />
    );
}

export default Step3;