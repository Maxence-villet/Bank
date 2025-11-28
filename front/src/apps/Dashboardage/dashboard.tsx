

import { BalanceHistoryChart } from '../../components/Dashboard/BalanceHistoryChart';
import { TransactionList } from '../../components/Dashboard/TransactionList';
import { useAllTransactions } from '../../components/transaction/request/getAllTransaction';
import type { CardData } from '../../components/transaction/request/listMapper';

const calculateCurrentBalance = (transactions: CardData[]): number => {
    return transactions.reduce((acc, tx) => acc + (tx.isGain ? tx.price : -tx.price), 0);
};


const Dashboard = () => {
    const { 
        data: transactions, 
        isLoading, 
        isError 
    } = useAllTransactions();
    

    const displayTransactions = transactions || [];
    const currentBalance = calculateCurrentBalance(displayTransactions);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Chargement des données du tableau de bord...</div>
            </div>
        );
    }
    
    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="p-8 text-xl font-semibold text-red-700 bg-red-100 rounded-lg">
                    Impossible de charger les données. Veuillez vérifier la connexion à l'API.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Tableau de Bord</h1>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-center items-center">
                           <h3 className="text-xl font-semibold mb-2 text-gray-700">Solde Disponible</h3>
                           <p className={`text-5xl font-extrabold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                               {currentBalance.toFixed(2)} €
                           </p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <BalanceHistoryChart transactions={displayTransactions} />
                    </div>
                    
                
                    <div className="md:col-span-3">
                        <TransactionList 
                            transactions={displayTransactions} 
                            limit={10} 
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;