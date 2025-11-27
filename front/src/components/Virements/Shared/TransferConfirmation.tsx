import React from 'react';
import SendButton from '../../SvgIcons/SendButton';
import DownloadButton from '../../SvgIcons/DownloadButton';

interface StepItemProps {
    number: number;
    title: string;
    bubbleBg: string;
    numberColor: string;
    titleColor: string;
}

const StepItem = ({ number, title, bubbleBg, numberColor, titleColor }: StepItemProps) => {
    return (
        <div className="flex flex-col items-center relative">
            <div className="flex items-center">
                <div className={`w-12 h-12 px-3.5 py-0.5 ${bubbleBg} rounded-[48px] flex justify-center items-center shrink-0`}>
                    <div className={`${numberColor} text-lg font-bold leading-6`}>{number}</div>
                </div>
                <div className={`ml-4 ${titleColor} text-lg leading-6 whitespace-nowrap`}>
                    {title}
                </div>
            </div>
        </div>
    );
};

const Separator = ({ isActive }: { isActive: boolean }) => (
    <div className={`flex-1 h-0 border-t ${isActive ? 'border-neutral-400' : 'border-neutral-400'} mx-4`}></div>
);

const CheckIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#14B8A6"/>
        <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="white"/>
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-16 h-16 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

export interface TransferConfirmationProps {
    transferAmount: string;
    beneficiaryName: string;
    steps: Array<{
        number: number;
        title: string;
        isActive: boolean;
    }>;
    useCircleIcon?: boolean;
    onNewTransfer?: () => void;
    onDownload?: () => void; // New optional prop for PDF
}

function TransferConfirmation({
    transferAmount,
    beneficiaryName,
    steps,
    useCircleIcon = false,
    onNewTransfer,
    onDownload
}: TransferConfirmationProps) {
    return (
        <div className="flex-1 self-stretch px-6 flex flex-col justify-start items-center gap-12">

            <div className="flex items-center w-full max-w-[800px] pt-6">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <StepItem
                            number={step.number}
                            title={step.title}
                            bubbleBg={step.isActive ? "bg-teal-400" : "bg-teal-300"}
                            numberColor={step.isActive ? "text-white" : "text-black"}
                            titleColor="text-teal-700 font-bold"
                        />
                        {index < steps.length - 1 && (
                            <Separator isActive={true} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="w-[500px] p-12 bg-white rounded-2xl flex flex-col justify-start items-center gap-8 shadow-lg text-center">

                <div className="w-12 h-12 flex justify-center items-center">
                    {useCircleIcon ? <CheckCircleIcon /> : <CheckIcon />}
                </div>

                <div className="flex flex-col justify-start items-center gap-2">
                    <h1 className="text-emerald-950 text-4xl font-bold leading-[48px] tracking-tight">
                        Virement envoyé !
                    </h1>
                    <p className="text-gray-600 text-lg font-normal leading-7">
                        <strong>{transferAmount}€</strong> ont été envoyé à <strong>{beneficiaryName}</strong>
                    </p>
                </div>

                <div className="self-stretch flex flex-col justify-start items-center gap-4 pt-4">
                    <button
                        className="self-stretch px-6 py-4 rounded-md bg-teal-400 text-white text-lg font-bold inline-flex justify-center items-center transition-colors hover:bg-teal-500"
                        onClick={onDownload}
                    >
                        <div className='flex gap-2'>
                            <p>Télécharger un reçu</p>
                            <DownloadButton fillColor='#fff' />
                        </div>
                    </button>

                    <button
                        className="self-stretch px-6 py-4 rounded-md border-2 border-neutral-300 text-emerald-950 text-lg font-bold inline-flex justify-center items-center transition-colors hover:bg-neutral-100 bg-white"
                        onClick={onNewTransfer}
                    >
                        <div className='flex gap-2'>
                            <p>Nouveau virement</p>
                            <SendButton fillColor='#002222' />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransferConfirmation;