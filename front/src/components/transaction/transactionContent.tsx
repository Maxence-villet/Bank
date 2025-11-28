import ShowList from "./showstat/showList";
import TransactionPagination from "./transactionPagination";

const  TransactionContent = () => {

    return (
        <div className="flex flex-row justify-between mt-[40px] h-full">
            <TransactionPagination/>
            <ShowList
                Revenus={342}
                Sortie={876}
                Transactions={23}
            />
        </div>   

    )
}
export default TransactionContent;