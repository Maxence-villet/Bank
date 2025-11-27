import { useState } from 'react';

const SearchIcon = ({ color = "#6B7280" }) => (
    <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
);

const PlusIcon = ({ color = "#14B8A6" }) => (
    <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
    </svg>
);

const MoreVerticalIcon = ({ color = "#6B7280" }) => (
    <svg className="w-5 h-5" fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
    </svg>
);

const mockBeneficiaries = [
    { name: "Jean Louis David", iban: "FR76 1234 4321 0987..." },
    { name: "Marie Curie", iban: "FR76 5432 1098 7654..." },
    { name: "Albert Einstein", iban: "FR76 9876 5432 1098..." },
    { name: "Charles Leclerc", iban: "FR76 1122 3344 5566..." },
];


function Step2() {
    const [debitAccount, setDebitAccount] = useState('Compte principal');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(mockBeneficiaries[0].iban);
    
    const debitAccounts = [
        { name: 'Compte principal', balance: '1234,56€' },
        // ... autres comptes
    ];

    const filteredBeneficiaries = mockBeneficiaries.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.iban.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isNextButtonEnabled = selectedBeneficiary !== null;

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
                        <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] flex justify-center items-center">
                            <div className="text-black text-lg font-bold leading-6">2</div>
                        </div>
                        <div className="justify-start text-teal-700 text-lg font-bold leading-6">Bénéficiaire</div>
                        <div className="w-24 border-t border-neutral-400"></div>
                    </div>
                    
                    <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                        <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] flex justify-center items-center">
                            <div className="text-black text-lg font-bold leading-6">4</div>
                        </div>
                        <div className="justify-start text-gray-500 text-lg font-bold leading-6">Confirmation</div>
                    </div>
                </div>

                <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-8 shadow-lg">
                    
                    <h1 className="text-emerald-950 text-4xl font-bold leading-[48px] tracking-tight">Choisir un bénéficiaire</h1>
                    
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                        
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

                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                            <label htmlFor="credit-search" className="text-emerald-950 text-base font-bold leading-6">
                                Compte à créditer
                            </label>
                            <div className="relative self-stretch">
                                <input
                                    id="credit-search"
                                    type="text"
                                    placeholder="Rechercher un bénéficiaire"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full text-base font-normal leading-6 pr-10"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <SearchIcon color="#A1A1AA" />
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            className="self-stretch px-6 py-4 rounded-md border border-neutral-300 text-teal-700 text-lg font-bold inline-flex justify-center items-center gap-2 transition-colors hover:bg-teal-50"
                            // onClick={() => console.log('Ouvrir modal ajout bénéficiaire')}
                        >
                            Ajouter un bénéficiaire <PlusIcon />
                        </button>
                    </div>

                    <div className="self-stretch flex flex-col justify-start items-start gap-2 max-h-96 overflow-y-auto">
                        
                        {filteredBeneficiaries.map((beneficiary) => (
                            <div 
                                key={beneficiary.iban}
                                onClick={() => setSelectedBeneficiary(beneficiary.iban)}
                                className={`self-stretch px-4 py-3 rounded-md border transition-all duration-200 cursor-pointer 
                                    ${selectedBeneficiary === beneficiary.iban 
                                        ? 'bg-teal-50 border-teal-400 shadow-sm' 
                                        : 'bg-white border-neutral-200 hover:bg-neutral-50'}`}
                            >
                                <div className="inline-flex justify-between items-center self-stretch w-full">
                                    <div className="flex flex-col justify-start items-start">
                                        <div className="text-emerald-950 text-base font-normal leading-6">
                                            {beneficiary.name}
                                        </div>
                                        <div className="text-gray-500 text-sm font-normal leading-5">
                                            {beneficiary.iban}
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                                        <MoreVerticalIcon color="#A1A1AA" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredBeneficiaries.length === 0 && (
                            <div className="text-center text-gray-500 py-4 self-stretch">
                                Aucun bénéficiaire trouvé.
                            </div>
                        )}
                    </div>
                    
                    <div className="self-stretch inline-flex justify-between items-start pt-4">
                        <button 
                            className="px-6 py-4 rounded-md border-2 border-neutral-300 text-emerald-950 text-lg font-bold transition-colors hover:bg-neutral-100 bg-white"
                            // onClick={() => console.log('Précédent')} 
                        >
                            Précédent
                        </button>
                        <button 
                            className={`px-6 py-4 rounded-md text-white text-lg font-bold transition-colors 
                                ${isNextButtonEnabled ? 'bg-teal-400 hover:bg-teal-500' : 'bg-teal-200 cursor-not-allowed'}`}
                            disabled={!isNextButtonEnabled} 
                            // onClick={() => console.log('Suivant avec bénéficiaire:', selectedBeneficiary)} 
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default Step2;