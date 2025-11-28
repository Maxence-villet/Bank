import { useState, useEffect } from "react";
import CardGenerator from "./cardGenerator";
// Assurez-vous que le chemin d'import est bon
import { useAllTransactions } from "./request/getAllTransaction"; 
import React from "react";

// Ton interface actuelle
interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number;
  date: string; 
  status: "en cours" | "terminé" | string;
}

const cards2: CardData[] =  [
    { title: "Achat PayPal", subtitle: "Virement", price: 0, isGain: false, date: "26/11/2025", status: "en cours" },
    { title: "Netflix", subtitle: "Abonnement", price: 12.99, isGain: false, date: "25/11/2025", status: "terminé" },
    { title: "Amazon", subtitle: "Commande", price: 42.5,  isGain: true ,date: "25/11/2025", status: "terminé" },
    { title: "Électricité", subtitle: "Facture", price: 89.3, isGain: true , date: "24/11/2025", status: "terminé" },
    { title: "Spotify", subtitle: "Abonnement", price: 9.99, isGain: false, date: "26/11/2025", status: "en cours" },
    { title: "Loyer", subtitle: "Paiement", price: 750, isGain: false, date: "23/11/2025", status: "terminé" },
    { title: "Salaire", subtitle: "Virement", price: 2100, isGain: true, date: "22/11/2025", status: "terminé" },
];

const TransactionPagination = ({ filter }: { filter: 'transactions' | 'recettes' | 'depenses' }) => {

    // 1. Appel du hook
    const { data: rawData, isLoading } = useAllTransactions();

    // 2. Console log pour voir la structure de ton API
    useEffect(() => {
        if (rawData) {
            console.log("🔥 Données brutes de l'API :", rawData);
        }
    }, [rawData]);

    // 3. Logique de fallback
    // ATTENTION : rawData contient la structure de ton API, pas encore CardData.
    // Si tu passes rawData directement à CardGenerator sans conversion, ça risque de casser l'affichage 
    // si les noms des propriétés (title vs label, price vs amount) sont différents.
    // Pour l'instant, je le cast en 'any' pour éviter l'erreur TS, mais tu devras faire un .map() ici plus tard.
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const displayData = (rawData as any[]) ?? cards2;
    console.log("🔥 Données affichées :", displayData);
    // Si tu veux utiliser uniquement cards2 tant que la conversion n'est pas faite, décommente la ligne ci-dessous :
    // const displayData = cards2; 

    // --- Pagination Logic ---
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 5;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = displayData.slice(indexOfFirstCard, indexOfLastCard);

    const pageCount = Math.ceil(displayData.length / cardsPerPage);
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

    const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, pageCount));
    const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

    if (isLoading && !rawData) {
        return <div className="p-6 text-center">Chargement des transactions...</div>;
    }

    return (
        <div style={{ padding: "24px" }} className="flex flex-row justify-between w-full rounded-[16px] bg-white ">
            <div className="flex flex-col w-full">
                {/* Note: CardGenerator risque de recevoir des props undefined si rawData ne matche pas CardData */}
                <CardGenerator cards={currentCards as CardData[]} activeTab={filter} />
                
                {displayData.length > cardsPerPage && (
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-teal-100 text-teal-400 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                           {'<'}
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`py-3 rounded-[5px] inline-flex justify-center items-center font-medium text-[14px]
                                    ${currentPage === number ? "bg-teal-400 text-white" : "text-gray-700 hover:bg-gray-300"} w-11 text-center`}
                            >
                                {String(number).padStart(2, '0')}
                            </button>
                        ))}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === pageCount}
                            className="px-4 py-2 bg-teal-100 text-teal-400 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {'>'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionPagination;