import { useState } from "react";
import CardGenerator from "./cardGenerator";

interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number;
  date: string; // format "dd/mm/yyyy"
  status: "en cours" | "terminé" | string;
}

const cards: CardData[] =  [
    { title: "Achat PayPal", subtitle: "Virement", price: 0, isGain: false, date: "26/11/2025", status: "en cours" },
    { title: "Netflix", subtitle: "Abonnement", price: 12.99, isGain: false, date: "25/11/2025", status: "terminé" },
    { title: "Amazon", subtitle: "Commande", price: 42.5,  isGain: true ,date: "25/11/2025", status: "terminé" },
    { title: "Électricité", subtitle: "Facture", price: 89.3, isGain: true , date: "24/11/2025", status: "terminé" },
    { title: "Spotify", subtitle: "Abonnement", price: 9.99, isGain: false, date: "26/11/2025", status: "en cours" },
    // Ajoutez d'autres transactions pour mieux voir la pagination
    { title: "Loyer", subtitle: "Paiement", price: 750, isGain: false, date: "23/11/2025", status: "terminé" },
    { title: "Salaire", subtitle: "Virement", price: 2100, isGain: true, date: "22/11/2025", status: "terminé" },
];

const TransactionPagination = ({filter}:{filter: 'transactions' | 'recettes' | 'depenses'}) => {
    // État pour suivre la page actuelle
    const [currentPage, setCurrentPage] = useState(1);
    
    // Définir le nombre de cartes à afficher par page en fonction de la hauteur disponible
    // Vous pouvez ajuster cette valeur
    const cardsPerPage = 5;

    // Calculer les cartes à afficher sur la page actuelle
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    // Calculer le nombre total de pages
    const pageCount = Math.ceil(cards.length / cardsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    // Fonctions pour changer de page
    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, pageCount));
    };

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    };

    return (
        <div style={{ padding: "24px" }} className="flex flex-row justify-between w-full rounded-[16px] bg-white ">
            <div className="flex flex-col w-full   ">
                <CardGenerator
                    cards={currentCards} activeTab={filter}                />
                {cards.length > cardsPerPage && (
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-teal-100 text-teal-400 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" // Ajout de flex pour centrer l'icône
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2" 
                                stroke="currentColor"
                                className="w-5 h-5" 
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`
                                    py-3 rounded-[5px] inline-flex justify-center items-center gap-2 font-medium leading-5 text-[14px]  font-["Inter']
                                    ${
                                        currentPage === number
                                            ? "bg-teal-400 text-white" // Style actif de votre div
                                            : " text-gray-700 hover:bg-gray-300" // Style inactif, couleur de texte pour lisibilité
                                    }
                                    w-11 text-center text-sm font-medium font-['Inter'] leading-5
                                `}
                            >
                                {String(number).padStart(2, '0')} {/* Format "01", "02", etc. */}
                            </button>
                        ))}
                        
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === pageCount}
                            className="px-4 py-2 bg-teal-100 text-teal-400 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionPagination;