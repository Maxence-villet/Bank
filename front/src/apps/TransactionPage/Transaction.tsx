import HeaderTransaction from "../../components/transaction/headerTransaction";
import TransactionContent from "../../components/transaction/transactionContent";

const  TransactionPage = () => {
    return (
        <div className="h-full flex flex-grow flex-col" style={{ paddingLeft: "48px" ,paddingRight: "24px", paddingBottom:"48px"}}>
            <HeaderTransaction title ={'Vos Transactions'} subtitle={'Gérer tout l’historique de vos transactions'}/>
            <TransactionContent/>
        </div>

    )
}
export default TransactionPage;