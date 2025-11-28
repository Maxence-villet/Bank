import TransactionFilter from "./TransactionFilter";
import ShowList from "./showstat/showList";

const  TransactionContent = () => {

    return (
        <div className="flex flex-row justify-between mt-[40px] h-full">
            <TransactionFilter/>
            <ShowList
                Revenus={342}
                Sortie={876}
                Transactions={23}
            />
        </div>   

    )
}
export default TransactionContent;