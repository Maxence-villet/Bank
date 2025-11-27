import { useState } from 'react';
import Step1 from '../../components/Virements/Step1';
import Step2Externe from '../../components/Virements/Externe/Step2';
import Step3Externe from '../../components/Virements/Externe/Step3';
import Step4Externe from '../../components/Virements/Externe/Step4';
import Step2Interne from '../../components/Virements/Interne/Step2';
import Step3Interne from '../../components/Virements/Interne/Step3';

type TransferType = 'internal' | 'external';

function VirementPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [transferType, setTransferType] = useState<TransferType>('internal');

    const handleNext = () => {
        if (transferType === 'internal') {
            // Pour les virements internes: 1 → 2 → 3
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            // Pour les virements externes: 1 → 2 → 3 → 4
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleTransferTypeSelect = (type: TransferType) => {
        setTransferType(type);
    };

    const renderCurrentStep = () => {
        if (currentStep === 1) {
            return (
                <Step1
                    selectedTransferType={transferType}
                    onTransferTypeSelect={handleTransferTypeSelect}
                    onNext={handleNext}
                />
            );
        }

        if (transferType === 'internal') {
            switch (currentStep) {
                case 2:
                    return (
                        <Step2Interne
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    );
                case 3:
                    return (
                        <Step3Interne
                            onPrevious={handlePrevious}
                        />
                    );
                default:
                    return null;
            }
        } else {
            switch (currentStep) {
                case 2:
                    return (
                        <Step2Externe
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    );
                case 3:
                    return (
                        <Step3Externe
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    );
                case 4:
                    return (
                        <Step4Externe
                            onPrevious={handlePrevious}
                        />
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F7FCFC]">
            {renderCurrentStep()}
        </div>
    );
}

export default VirementPage;