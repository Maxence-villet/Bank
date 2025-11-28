// components/TransactionList.tsx

import React, { useEffect } from 'react';import { useAllTransactions } from '../transaction/request/getAllTransaction';
interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number;
  date: string; 
  status: "en cours" | "terminé" | string;
}

interface TransactionListProps {
    transactions: CardData[];
    limit?: number; // Optionnel : pour afficher seulement N éléments
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, limit }) => {
    const { data: rawData } = useAllTransactions();
    
        // 2. Console log pour voir la structure de ton API
        useEffect(() => {
            if (rawData) {
                console.log(" Données brutes de l'API :", rawData);
            }
        }, [rawData]);
    // Filtrer ou limiter les transactions à afficher
    const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Dernières Transactions</h3>
            
            {displayTransactions.length === 0 ? (
                <p className="text-gray-500">Aucune transaction trouvée.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {displayTransactions.map((tx, index) => (
                        <li key={index} className="py-3 flex justify-between items-center">
                            
                            {/* Détails du titre et sous-titre */}
                            <div>
                                <p className="font-medium text-gray-900">{tx.title}</p>
                                <p className="text-sm text-gray-500">{tx.subtitle} ({tx.date})</p>
                            </div>

                            {/* Montant et statut */}
                            <div className="text-right">
                                <p className={`font-bold ${tx.isGain ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.isGain ? '+' : '-'} {tx.price.toFixed(2)}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded-full 
                                    ${tx.status === 'terminé' ? 'bg-green-100 text-green-800' : 
                                      tx.status === 'en cours' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'}`}>
                                    {tx.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};