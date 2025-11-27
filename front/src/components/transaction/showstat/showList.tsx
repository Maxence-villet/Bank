import ShowStat from "./showstat"

const ShowList =()=> {
    return(
        <div className="flex flex-col">
           <ShowStat title="Revenus" stat={2500} isPriceGain={true}></ShowStat>
           <ShowStat title="Sortie" stat={1500} isPriceGain={true}></ShowStat>
           <ShowStat title="Transactions" stat={250} isPriceGain={false}></ShowStat>
        </div>
    )
}
export default ShowList;