import { useState } from 'react';
import SendButton from "../SvgIcons/SendButton";
import ArrowButton from "../SvgIcons/ArrowButton";
import GlobelButton from "../SvgIcons/GlobelButton";


function Step1() {
    const [selectedTransferType, setSelectedTransferType] = useState<'internal' | 'external'>('internal');

    const activeIconColor = "#FFF"; 
    const activeTealColor = "#14B8A6"; 

    return (
            <div className="flex-1 self-stretch px-6 pb-12 flex flex-col justify-start items-center gap-12">
                
                <div className="inline-flex justify-start items-center gap-4">
                    
                    <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                        <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] flex justify-center items-center">
                            <div className="text-black text-lg font-bold leading-6">1</div>
                        </div>
                        <div className="text-teal-700 text-lg font-bold leading-6">Type de virement</div>
                        <div className="w-24 border-t border-neutral-400"></div> 
                    </div>
                    
                    <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                        <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] flex justify-center items-center">
                            <div className="text-black text-lg font-bold leading-6">2</div>
                        </div>
                        <div className="justify-start text-gray-500 text-lg font-bold leading-6">Bénéficiaire</div>
                        <div className="w-24 border-t border-neutral-400"></div>
                    </div>
                    
                    <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                        <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] flex justify-center items-center">
                            <div className="text-black text-lg font-bold leading-6">4</div>
                        </div>
                        <div className="justify-start text-gray-500 text-lg font-bold leading-6">Confirmation</div>
                    </div>
                </div>

                
                <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-12 shadow-lg">
                    <h1 className="text-emerald-950 text-4xl font-bold leading-[48px] tracking-tight">Effectuer un virement</h1>
                    
                    <div className="self-stretch flex flex-col justify-start items-start gap-6">
                        
                        <div 
                            onClick={() => setSelectedTransferType('internal')}
                            className={`self-stretch px-6 py-4 rounded-2xl inline-flex justify-between items-center cursor-pointer transition-all duration-200 
                                ${selectedTransferType === 'internal' ? 'bg-teal-400' : 'bg-slate-50 hover:bg-teal-50'}`}
                        >
                            <div className="flex justify-start items-center gap-4">
                                <div className={`w-12 h-12 p-2.5 rounded-[47px] flex justify-center items-center 
                                    ${selectedTransferType === 'internal' ? 'bg-teal-300' : 'bg-teal-100'}`}>
                                    
                                    <SendButton 
                                        fillColor={selectedTransferType === 'internal' ? activeIconColor : activeTealColor} 
                                    />
                                </div>
                                <div className="flex flex-col justify-start items-start gap-2">
                                    <div className={`text-base font-normal leading-6 ${selectedTransferType === 'internal' ? 'text-white' : 'text-emerald-950'}`}>
                                        Virement interne
                                    </div>
                                    <div className={`text-sm font-normal leading-5 ${selectedTransferType === 'internal' ? 'text-white' : 'text-gray-500'}`}>
                                        Envoyer des fonds sur vos comptes
                                    </div>
                                </div>
                            </div>
                            
                            {selectedTransferType === 'internal' ? (
                                <ArrowButton 
                                    fillColor={activeIconColor} 
                                />
                            ) : (
                                <ArrowButton 
                                    fillColor={activeTealColor} 
                                />
                            )}
                        </div>
                        
                        <div 
                            onClick={() => setSelectedTransferType('external')}
                            className={`self-stretch px-6 py-4 rounded-2xl inline-flex justify-between items-center cursor-pointer transition-all duration-200 
                                ${selectedTransferType === 'external' ? 'bg-teal-400' : 'bg-slate-50 hover:bg-teal-50'}`}
                        >
                            <div className="flex justify-start items-center gap-4">
                                <div className={`w-12 h-12 p-2.5 rounded-[47px] flex justify-center items-center 
                                    ${selectedTransferType === 'external' ? 'bg-teal-300' : 'bg-teal-100'}`}>
                                    
                                    {/* Correction: Utilisation de GlobelButton */}
                                    <GlobelButton 
                                        fillColor={selectedTransferType === 'external' ? activeIconColor : activeTealColor} 
                                    />
                                </div>
                                <div className="flex flex-col justify-start items-start gap-2">
                                    <div className={`text-base font-normal leading-6 ${selectedTransferType === 'external' ? 'text-white' : 'text-emerald-950'}`}>
                                        Virement externe
                                    </div>
                                    <div className={`text-sm font-normal leading-5 ${selectedTransferType === 'external' ? 'text-white' : 'text-gray-500'}`}>
                                        Effectuez un virement instantaté
                                    </div>
                                </div>
                            </div>
                            
                            {selectedTransferType === 'external' ? (
                                <ArrowButton 
                                    fillColor={activeIconColor} 
                                />
                            ) : (
                                <ArrowButton 
                                    fillColor={activeTealColor} 
                                />
                            )}
                        </div>
                    </div>
                    
                    <div className="self-stretch inline-flex justify-between items-start">
                        <button 
                            className="px-6 py-4 rounded-md border-2 border-emerald-950 text-emerald-950 text-lg font-bold transition-colors hover:bg-emerald-50"
                        >
                            Annuler
                        </button>
                        <button 
                            className="px-6 py-4 bg-teal-400 rounded-md text-white text-lg font-bold transition-colors hover:bg-teal-500"
                            disabled={!selectedTransferType}
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default Step1;