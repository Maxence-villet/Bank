import CardGenerator from "./cardGenerator";
import ShowList from "./showstat/showList";

const  TransactionContent = () => {
    return (
        <div className="flex flex-row justify-between mt-[40px]">
            <CardGenerator/>
            <ShowList/>
        </div>
           

    )
}
export default TransactionContent;