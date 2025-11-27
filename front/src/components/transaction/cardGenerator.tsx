import React, { useState } from "react";
import Card from "./card";

interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number;
  date: string;
  status: "en cours" | "terminé" | string;
}

type FilterType = "transactions" | "recettes" | "depenses";

const CardGenerator: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre de cartes par page

  const cards: CardData[] = [
    { title: "Achat PayPal", subtitle: "Virement", price: 0, isGain: false, date: "26/11/2025", status: "en cours" },
    { title: "Netflix", subtitle: "Abonnement", price: 12.99, isGain: false, date: "25/11/2025", status: "terminé" },
    { title: "Amazon", subtitle: "Commande", price: 42.5,  isGain: true ,date: "25/11/2025", status: "terminé" },
    { title: "Électricité", subtitle: "Facture", price: 89.3, isGain: true , date: "24/11/2025", status: "terminé" },
    { title: "Spotify", subtitle: "Abonnement", price: 9.99, isGain: false, date: "26/11/2025", status: "en cours" },
    { title: "Orange", subtitle: "Téléphone", price: 29.99, isGain: false, date: "24/11/2025", status: "terminé" },
    { title: "Paypal reçu", subtitle: "Virement", price: 150, isGain: true, date: "23/11/2025", status: "terminé" },
    { title: "Ticket resto", subtitle: "Avantage", price: 20, isGain: true, date: "23/11/2025", status: "en cours" },
    { title: "Amazon Prime", subtitle: "Abonnement", price: 8.99, isGain: false, date: "22/11/2025", status: "terminé" },
    { title: "EDF", subtitle: "Facture", price: 65, isGain: false, date: "22/11/2025", status: "terminé" },
    { title: "Reçu freelance", subtitle: "Travail", price: 300, isGain: true, date: "21/11/2025", status: "terminé" },
    { title: "Spotify Premium", subtitle: "Abonnement", price: 9.99, isGain: false, date: "21/11/2025", status: "terminé" }
  ];

  const filteredCards = cards.filter(c => {
    if (filter === "transactions") return true;
    if (filter === "recettes") return c.isGain;
    if (filter === "depenses") return !c.isGain;
    return true;
  });

  // Séparer en cours / terminés
  const inProgress: CardData[] = filteredCards.filter(c => c.status === "en cours");
  const completed: CardData[] = filteredCards.filter(c => c.status !== "en cours");

  // Grouper les terminés par date
  const groupedByDate: Record<string, CardData[]> = completed.reduce((acc, card) => {
    if (!acc[card.date]) acc[card.date] = [];
    acc[card.date].push(card);
    return acc;
  }, {} as Record<string, CardData[]>);

  const sortDatesDesc = (dates: string[]) => {
    return dates.sort((a, b) => {
      const [da, ma, ya] = a.split("/").map(Number);
      const [db, mb, yb] = b.split("/").map(Number);
      return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
    });
  };

  // Pagination
  const allCards: CardData[] = [...inProgress, ...sortDatesDesc(Object.keys(groupedByDate)).flatMap(date => groupedByDate[date])];
  const totalPages = Math.ceil(allCards.length / itemsPerPage);
  const paginatedCards = allCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Menu horizontal */}
      <div className="flex gap-4 mb-6">
        {["transactions", "recettes", "depenses"].map(f => (
          <button
            key={f}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => { setFilter(f as FilterType); setCurrentPage(1); }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Cartes paginées */}
      <div className="flex flex-col gap-6">
        {paginatedCards.map((c, i) => (
          <Card key={i} {...c} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default CardGenerator;
