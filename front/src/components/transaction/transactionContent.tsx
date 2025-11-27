import CardGenerator from "./cardGenerator";
import ShowList from "./showstat/showList";

interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number;
  date: string; // format "dd/mm/yyyy"
  status: "en cours" | "terminé" | string;
}

const  TransactionContent = () => {
     const cards: CardData[] =  [
        { title: "Achat PayPal", subtitle: "Virement", price: 0, isGain: false, date: "26/11/2025", status: "en cours" },
        { title: "Netflix", subtitle: "Abonnement", price: 12.99, isGain: false, date: "25/11/2025", status: "terminé" },
        { title: "Amazon", subtitle: "Commande", price: 42.5,  isGain: true ,date: "25/11/2025", status: "terminé" },
        { title: "Électricité", subtitle: "Facture", price: 89.3, isGain: true , date: "24/11/2025", status: "terminé" },
        { title: "Spotify", subtitle: "Abonnement", price: 9.99, isGain: false, date: "26/11/2025", status: "en cours" }
      ]
    return (
        <div className="flex flex-row justify-between mt-[40px]">
            <CardGenerator
                cards={cards}
            />
            <ShowList/>
        </div>
           

    )
}
export default TransactionContent;