/**
 * Transforme un tableau de transactions brutes de l'API en un format `CardData` pour l'UI.
 * @param apiTransactions - Les transactions de l'API.
 * @param myAccountIds - Un tableau des IDs de compte de l'utilisateur.
 * @returns Un tableau de CardData.
 */

interface ApiTransaction {
    uuid_transaction: string;
    sender_id: string;
    receiver_id: string;
    amount: number; // ex: 1200
    description: string | null;
    pending_at: string | null;
    completed_at: string | null;
    failed_at: string | null;
    cancelled_at: string | null;
    status: 'completed' | 'pending' | 'cancelled' | 'failed' | string;
}

// Données formatées pour le composant CardGenerator
export interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number; // ex: 12.00
  date: string;  // ex: "28/11/2025"
  status: "en cours" | "terminé" | "annulé" | string;
}

export const mapApiTransactionsToCardData = (
  apiTransactions: ApiTransaction[],
  myAccountIds: (string | number)[]
): CardData[] => {
  return apiTransactions.map((tx) => {
    // Règle 1: isGain
    const isGain = myAccountIds.includes(tx.receiver_id);

    // Règle 2: title et subtitle
    const title = tx.description || (isGain ? "Virement Reçu" : "Paiement");
    const subtitle = myAccountIds.includes(tx.sender_id) ? "Virement" : "Achat";

    // Règle 3: status
    let status: CardData['status'] = 'inconnu';
    switch (tx.status) {
      case 'completed':
        status = 'terminé';
        break;
      case 'pending':
        status = 'en cours';
        break;
      case 'cancelled':
      case 'failed':
        status = 'annulé';
        break;
    }


    const price = tx.amount / 100;

    const relevantDateString = tx.completed_at || tx.cancelled_at || tx.failed_at || tx.pending_at;
    let date = 'Date inconnue';
    if (relevantDateString) {
      const d = new Date(relevantDateString);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0'); 
      const year = d.getFullYear();
      date = `${day}/${month}/${year}`;
    }

    return { title, subtitle, isGain, price, date, status };
  });
};