import React from "react";
import Card from "./card";

// Définition des types
interface CardData {
  title: string;
  subtitle: string;
  isGain:boolean;
  price: number;
  date: string; // format "dd/mm/yyyy"
  status: "en cours" | "terminé" | string;
}

const CardGenerator: React.FC = () => {
  const cards: CardData[] = [
    { title: "Achat PayPal", subtitle: "Virement", price: 0, isGain: false, date: "26/11/2025", status: "en cours" },
    { title: "Netflix", subtitle: "Abonnement", price: 12.99, isGain: false, date: "25/11/2025", status: "terminé" },
    { title: "Amazon", subtitle: "Commande", price: 42.5,  isGain: true ,date: "25/11/2025", status: "terminé" },
    { title: "Électricité", subtitle: "Facture", price: 89.3, isGain: true , date: "24/11/2025", status: "terminé" },
    { title: "Spotify", subtitle: "Abonnement", price: 9.99, isGain: false, date: "26/11/2025", status: "en cours" }
  ];

  // Séparer les cartes "en cours" et les autres
  const inProgress: CardData[] = cards.filter(c => c.status === "en cours");
  const completed: CardData[] = cards.filter(c => c.status !== "en cours");

  // Grouper les cartes terminées par date
  const groupedByDate: Record<string, CardData[]> = completed.reduce((acc, card) => {
    if (!acc[card.date]) acc[card.date] = [];
    acc[card.date].push(card);
    return acc;
  }, {} as Record<string, CardData[]>);

  // Fonction pour trier les dates du plus récent au plus ancien
  const sortDatesDesc = (dates: string[]) => {
    return dates.sort((a, b) => {
      const [da, ma, ya] = a.split("/").map(Number);
      const [db, mb, yb] = b.split("/").map(Number);
      return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
    });
  };

  return (
    <div className="flex flex-col gap-[24px]">
      {/* En cours */}
      {inProgress.length > 0 && (
        <div>
          <h3 className="text-left text-[#8C9C9C] text-[18px] text-lg mb-[24px] h-[27px]">En cours</h3>
          <div className="flex flex-col  gap-[24px]">
            {inProgress.map((c, i) => (
              <Card key={`in-${i}`} {...c} />
            ))}
          </div>
        </div>
      )}

      {/* Cartes terminées groupées par date */}
      {sortDatesDesc(Object.keys(groupedByDate)).map(date => (
        <div  key={date}>
          <h3
            className="text-left text-[#8C9C9C] text-[18px] font-normal leading-[150%] tracking-[-0.01em] mb-[24px] h-[27px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
            >
            {date}
            </h3>

          <div className="flex flex-col  gap-[24px]">
            {groupedByDate[date].map((c, i) => (
              <Card key={`${date}-${i}`} {...c} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGenerator;
