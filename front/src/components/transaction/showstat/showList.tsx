import ShowStat from "./showstat"

const ShowList =()=> {
    return(
        <div style={{paddingLeft:"24px"}} className="h-full flex flex-col gap-[24px]">
           <ShowStat title="Revenus" stat={2500} isPriceGain={true}></ShowStat>
           <ShowStat title="Sortie" stat={1500} isPriceGain={true}></ShowStat>
           <ShowStat title="Transactions" stat={250} isPriceGain={false}></ShowStat>
        </div>
    )
}
export default ShowList;