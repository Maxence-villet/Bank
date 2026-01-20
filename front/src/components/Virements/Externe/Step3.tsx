import { useState } from 'react';

// Composants d'icônes (inchangés par rapport à Step2)
// const SearchIcon = ({ color = "#6B7280" }) => (
//     <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//     </svg>
// );

// const PlusIcon = ({ color = "#14B8A6" }) => (
//     <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
//     </svg>
// );

const MoreVerticalIcon = ({ color = "#6B7280" }) => (
    <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
    </svg>
);

// Rendu d'une étape individuelle pour la barre de progression
interface StepItemProps {
    number: number;
    title: string;
    bubbleBg: string;      // ex: 'bg-teal-400', 'bg-teal-300', 'bg-teal-100'
    numberColor: string;   // ex: 'text-white', 'text-black'
    titleColor: string;    // ex: 'text-teal-700 font-bold', 'text-gray-500 font-normal'
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

// Composant pour le trait de séparation
const Separator = ({ isActive }: { isActive: boolean }) => (
    <div className={`flex-1 h-0 border-t ${isActive ? 'border-neutral-400' : 'border-neutral-400'} mx-4`}></div>
);


interface Step3ExterneProps {
    onNext: () => void;
    onPrevious: () => void;
}

// Composant Step3
function Step3({ onNext, onPrevious }: Step3ExterneProps) {
    const [debitAccount, setDebitAccount] = useState('Compte principal');
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('');

    const debitAccounts = [
        { name: 'Compte principal', balance: '1234,56€' },
        // ... autres comptes
    ];

    // Données de bénéficiaire simulées pour cette étape (devraient venir d'un état global ou props)
    const selectedBeneficiary = { name: "Jean Louis David", iban: "FR76 1234 4321 0987..." };

    const isNextButtonEnabled = amount.length > 0; // Simple validation pour l'exemple

    return (
        <div className="flex-1 self-stretch px-6 flex flex-col justify-start items-center gap-12">
            
            {/* Barre de progression pour Step3 */}
            <div className="flex items-center w-full max-w-[800px] pt-6">
                
                {/* ÉTAPE 1 : Type de virement (Complétée) */}
                <StepItem 
                    number={1} 
                    title="Type de virement" 
                    bubbleBg="bg-teal-400" 
                    numberColor="text-white" 
                    titleColor="text-teal-700 font-bold" 
                />

                {/* Trait complété */}
                <Separator isActive={true} />
                
                {/* ÉTAPE 2 : Bénéficiaire (Complétée) */}
                <StepItem 
                    number={2} 
                    title="Bénéficiaire" // Titre simplifié pour correspondre à l'image
                    bubbleBg="bg-teal-400" 
                    numberColor="text-white" 
                    titleColor="text-teal-700 font-bold" 
                />
                
                {/* Trait complété (car l'étape 3 est active) */}
                <Separator isActive={true} />

                {/* ÉTAPE 3 : Choisir le montant (Actuelle) */}
                <StepItem 
                    number={3} 
                    title="Choisir le montant" 
                    bubbleBg="bg-teal-300" 
                    numberColor="text-black" 
                    titleColor="text-teal-700 font-bold" 
                />

                {/* Trait inactif */}
                <Separator isActive={false} />
                
                {/* ÉTAPE 4 : Confirmation (Inactive) */}
                <StepItem 
                    number={4} 
                    title="Confirmation" 
                    bubbleBg="bg-teal-100" 
                    numberColor="text-black" 
                    titleColor="text-gray-500 font-normal" 
                />
            </div>

            {/* Contenu principal de Step3 */}
            <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-8 shadow-lg">
                
                <h1 className="text-emerald-950 text-4xl font-bold leading-[48px] tracking-tight">Choisir le montant</h1>
                
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    
                    {/* Compte à débiter */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <label htmlFor="debit-account" className="text-emerald-950 text-base font-bold leading-6">
                            Compte à débiter
                        </label>
                        <div className="relative self-stretch">
                            <select
                                id="debit-account"
                                value={debitAccount}
                                onChange={(e) => setDebitAccount(e.target.value)}
                                className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full appearance-none text-base font-normal leading-6 cursor-pointer"
                                style={{ paddingRight: '3rem' }} 
                            >
                                {debitAccounts.map((account) => (
                                    <option key={account.name} value={account.name}>
                                        {account.name} {account.balance}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Compte à créditer (Bénéficiaire) */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <label htmlFor="credit-account" className="text-emerald-950 text-base font-bold leading-6">
                            Compte à créditer
                        </label>
                        <div className="self-stretch px-4 py-3 rounded-md border border-neutral-200 bg-white">
                            <div className="inline-flex justify-between items-center self-stretch w-full">
                                <div className="flex flex-col justify-start items-start">
                                    <div className="text-emerald-950 text-base font-normal leading-6">
                                        {selectedBeneficiary.name}
                                    </div>
                                    <div className="text-gray-500 text-sm font-normal leading-5">
                                        {selectedBeneficiary.iban}
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                                    <MoreVerticalIcon color="#A1A1AA" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Montant et Libellé (facultatif) */}
                    <div className="self-stretch inline-flex justify-start items-start gap-4">
                        <div className="flex-1 flex flex-col justify-start items-start gap-2">
                            <label htmlFor="amount" className="text-emerald-950 text-base font-bold leading-6">
                                Montant
                            </label>
                            <div className="relative self-stretch">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base font-normal leading-6">$</span>
                                <input
                                    id="amount"
                                    type="number"
                                    placeholder="0,00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="self-stretch pl-10 pr-4 py-3 bg-white rounded-md border border-neutral-300 w-full text-base font-normal leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-2">
                            <label htmlFor="label" className="text-emerald-950 text-base font-bold leading-6">
                                Libellé (facultatif)
                            </label>
                            <input
                                id="label"
                                type="text"
                                placeholder="Libellé"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full text-base font-normal leading-6"
                            />
                        </div>
                    </div>

                </div>
                
                {/* Boutons de navigation */}
                <div className="self-stretch inline-flex justify-between items-start pt-4">
                    <button
                        className="px-6 py-4 rounded-md border-2 border-neutral-300 text-emerald-950 text-lg font-bold transition-colors hover:bg-neutral-100 bg-white"
                        onClick={onPrevious}
                    >
                        Précédent
                    </button>
                    <button
                        className={`px-6 py-4 rounded-md text-lg font-bold transition-colors
                            ${isNextButtonEnabled ? 'bg-teal-400 hover:bg-teal-500 text-black' : 'bg-teal-200 cursor-not-allowed text-white'}`}
                        disabled={!isNextButtonEnabled}
                        onClick={onNext}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step3;