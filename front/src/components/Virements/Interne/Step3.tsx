import { useState } from 'react';
import DownloadButton from '../../SvgIcons/DownloadButton';
import SendButton from '../../SvgIcons/SendButton';


const CheckIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#14B8A6"/> 
        <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="white"/>
    </svg>
);



function Step3() {
    const [status, setStatus] = useState('success'); 
    
    const transferAmount = "345€";
    const beneficiaryName = "Collocation";

    return (
        <div className="flex-1 self-stretch px-6 flex flex-col justify-start items-center gap-12">
            
            <div className="inline-flex justify-start items-center gap-4">
                
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-400 rounded-[48px] flex justify-center items-center">
                        <div className="text-white text-lg font-bold leading-6">1</div>
                    </div>
                    <div className="text-teal-700 text-lg font-bold leading-6">Type de virement</div>
                    <div className="w-24 border-t border-neutral-400"></div> 
                </div>
                
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-400 rounded-[48px] flex justify-center items-center">
                        <div className="text-white text-lg font-bold leading-6">2</div>
                    </div>
                    <div className="justify-start text-teal-700 text-lg font-bold leading-6">Choisir un compte</div>
                    <div className="w-24 border-t border-neutral-400"></div>
                </div>
                
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] flex justify-center items-center">
                        <div className="text-black text-lg font-bold leading-6">3</div>
                    </div>
                    <div className="justify-start text-teal-700 text-lg font-bold leading-6">Confirmation</div>
                </div>
            </div>

            <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-center gap-8 shadow-lg text-center">
                
                <div className="w-12 h-12 flex justify-center items-center">
                    <CheckIcon />
                </div>

                <div className="flex flex-col justify-start items-center gap-2">
                    <h1 className="text-emerald-950 text-4xl font-bold leading-[48px] tracking-tight">
                        Virement envoyé !
                    </h1>
                    <p className="text-gray-500 text-base font-normal leading-6">
                        <span className="font-bold">{transferAmount}</span> ont été envoyé à <span className="font-bold">{beneficiaryName}</span>
                    </p>
                </div>

                <div className="self-stretch flex flex-col justify-start items-stretch gap-4">
                    
                    <button 
                        className="self-stretch px-6 py-4 bg-teal-400 rounded-md inline-flex justify-center items-center gap-2 text-white text-lg font-bold transition-colors hover:bg-teal-500"
                        // onClick={() => console.log('Télécharger reçu')}
                    >
                        Télécharger un reçu <DownloadButton fillColor='#fff'/>
                    </button>

                    <button 
                        className="self-stretch px-6 py-4 rounded-md border-2 border-teal-400 text-teal-700 text-lg font-bold inline-flex justify-center items-center gap-2 transition-colors hover:bg-teal-50"
                        // onClick={() => console.log('Nouveau virement')}
                    >
                        Nouveau virement <SendButton fillColor='#00786f' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step3;