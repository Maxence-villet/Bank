import type { Account } from '../../../types/account';
import React from 'react';

interface Step2InterneProps {
    accounts: Account[];
    debitAccountId: string;
    onDebitAccountChange: (id: string) => void;
    creditAccountId: string;
    onCreditAccountChange: (id: string) => void;
    amount: number;
    onAmountChange: (amount: number) => void;
    label: string;
    onLabelChange: (label: string) => void;
    onNext: (e?: React.MouseEvent) => void;
    onPrevious: () => void;
}

function Step2({ 
    accounts, 
    debitAccountId, 
    onDebitAccountChange, 
    creditAccountId, 
    onCreditAccountChange, 
    amount, 
    onAmountChange, 
    label, 
    onLabelChange,
    onNext, 
    onPrevious 
}: Step2InterneProps) {
    const formatBalance = (amt: number) => ` ${(amt / 100).toFixed(2)}€`;

    const availableDebitAccounts = accounts.map(acc => {
        const balanceStr = formatBalance(acc.amount);
        if (acc.id.startsWith('C')) {
            return {
                id: acc.id,
                display: `compte courant | Balance: ${balanceStr}`
            };
        } else {
            return {
                id: acc.id,
                display: `Compte se terminant par ${acc.iban.slice(-4)} | Balance: ${balanceStr}`
            };
        }
    });

    const availableCreditAccounts = accounts
        .filter(acc => acc.id !== debitAccountId)
        .map(acc => {
            const balanceStr = formatBalance(acc.amount);
            if (acc.id.startsWith('C')) {
                return {
                    id: acc.id,
                    display: `compte courant | Balance: ${balanceStr}`
                };
            } else {
                return {
                    id: acc.id,
                    display: `Compte se terminant par ${acc.iban.slice(-4)} | Balance: ${balanceStr}`
                };
            }
        });

    const isValid = amount > 0 && debitAccountId && creditAccountId && debitAccountId !== creditAccountId;

    return (
        <div className="flex-1 self-stretch px-6 pb-12 flex flex-col justify-start items-center gap-12">
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
                    <div className="justify-start text-teal-700 text-lg font-bold leading-6">Choisir un Compte</div> 
                    <div className="w-24 border-t border-neutral-400"></div>
                </div>
                
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] flex justify-center items-center">
                        <div className="text-black text-lg font-bold leading-6">3</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold leading-6">Confirmation</div>
                </div>
            </div>

            <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-12 shadow-lg">
                <div className='w-full flex justify-center'>
                    <h1 className="text-emerald-950 text-4xl font-bold leading-[48px] tracking-tight">Choisir un Compte</h1>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <label htmlFor="debit-account" className="text-emerald-950 text-base font-bold leading-6">
                            Compte à débiter
                        </label>
                        <div className="relative self-stretch">
                            <select
                                id="debit-account"
                                value={debitAccountId}
                                onChange={(e) => onDebitAccountChange(e.target.value)}
                                className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full appearance-none text-base font-normal leading-6 cursor-pointer"
                                style={{ paddingRight: '3rem' }}
                            >
                                <option value="">Sélectionner un compte</option>
                                {availableDebitAccounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.display}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <label htmlFor="credit-account" className="text-emerald-950 text-base font-bold leading-6">
                            Compte à créditer
                        </label>
                        <div className="relative self-stretch">
                            <select
                                id="credit-account"
                                value={creditAccountId}
                                onChange={(e) => onCreditAccountChange(e.target.value)}
                                className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full appearance-none text-base font-normal leading-6 cursor-pointer"
                                style={{ paddingRight: '3rem' }}
                                disabled={!debitAccountId}
                            >
                                <option value="">Sélectionner un compte (après débit)</option>
                                {availableCreditAccounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.display}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="self-stretch inline-flex justify-start items-start gap-4">
                        
                        <div className="flex-1 flex flex-col justify-start items-start gap-2">
                            <label htmlFor="amount" className="text-emerald-950 text-base font-bold leading-6">
                                Montant
                            </label>
                            <div className="relative flex-1 self-stretch">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-950 text-lg font-bold">
                                    €
                                </div>
                                <input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={amount || ''}
                                    onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
                                    className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full pl-8 pr-4 text-base font-normal leading-6"
                                    min="0.01"
                                    step="0.01"
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
                                placeholder="Motif du virement"
                                value={label}
                                onChange={(e) => onLabelChange(e.target.value)}
                                className="self-stretch px-4 py-3 bg-white rounded-md border border-neutral-300 w-full text-base font-normal leading-6"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row justify-between self-stretch inline-flex items-start gap-4">
                    <button
                        className="px-6 py-4 rounded-md border-2 border-neutral-300 text-emerald-950 text-lg font-bold transition-colors hover:bg-neutral-100 bg-white"
                        onClick={onPrevious}
                    >
                        Précédent
                    </button>
                    <button
                        className={`px-6 py-4 rounded-md text-lg font-bold transition-colors
                            ${isValid ? 'bg-teal-400 hover:bg-teal-500 text-white' : 'bg-teal-200 cursor-not-allowed text-gray-400'}`}
                        disabled={!isValid}
                        onClick={onNext}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step2;