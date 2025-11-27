import { useState } from 'react';
import Step2 from '../../components/Virements/Externe/Step2';

function VirementPage() {
    const [step, setStep] = useState(1);
    const [transferType, setTransferType] = useState('internal');
    
    return (
        <>
        <Step2 />
        </>  
    );
}

export default VirementPage;