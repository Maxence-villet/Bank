import { useMemo } from "react"; // Importer useMemo
import Card from "./card";

interface CardData {
  title: string;
  subtitle: string;
  isGain: boolean;
  price: number;
  date: string; // format "dd/mm/yyyy"
  status: "en cours" | "terminé" | string;
}

interface CardGeneratorProps {
  cards: CardData[];
}

const CardGenerator = ({ cards }: CardGeneratorProps) => {

  const { inProgress, completed } = useMemo(() => {
    const tempInProgress: CardData[] = [];
    const tempCompleted: Record<string, CardData[]> = {};

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].status === "en cours") {
        tempInProgress.push(cards[i]);
      } else {
        if (!tempCompleted[cards[i].date]) {
          tempCompleted[cards[i].date] = [];
        }
        tempCompleted[cards[i].date].push(cards[i]);
      }
    }
    return { inProgress: tempInProgress, completed: tempCompleted };
  }, [cards]);

  const sortDatesDesc = (dates: string[]) => {
    return dates.sort((a, b) => {
      const [da, ma, ya] = a.split("/").map(Number);
      const [db, mb, yb] = b.split("/").map(Number);
      return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
    });
  };

  const sortedCompletedDates = useMemo(() => {
    return sortDatesDesc(Object.keys(completed));
  }, [completed]); 

  return (
    <div className="flex flex-col gap-[24px]  w-full h-full ">

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

      {sortedCompletedDates.map(date => ( // Utiliser sortedCompletedDates ici
        <div  key={date}>
          <h3
            className="text-left text-[#8C9C9C] text-[18px] font-normal leading-[150%] tracking-[-0.01em] mb-[24px] h-[27px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
            >
            {date}
            </h3>

          <div className="flex flex-col  gap-[24px]">
            {completed[date].map((c, i) => (
              <Card key={`${date}-${i}`} {...c} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGenerator;