import ShowList from "./showstat/showList";
import TransactionPagination from "./transactionPagination";

const  TransactionContent = () => {

    return (
        <div className="flex flex-row justify-between mt-[40px] h-full">
            <TransactionPagination/>
            <ShowList/>
        </div>   

    )
}
export default TransactionContent;