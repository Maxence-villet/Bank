import { useState } from 'react';
import Step4 from '../../components/Virements/Externe/Step4';

function VirementPage() {
    const [step, setStep] = useState(1);
    const [transferType, setTransferType] = useState('internal');
    
    return (
        <>
        <Step4 />
        </>  
    );
}

export default VirementPage;