import HeaderTransaction from "../../components/transaction/headerTransaction";
import TransactionContent from "../../components/transaction/transactionContent";

const  TransactionPage = () => {
    return (
        <div style={{ paddingLeft: "48px" ,paddingRight: "24px"}}>
            <HeaderTransaction/>
            <TransactionContent/>
        </div>

    )
}
export default TransactionPage;