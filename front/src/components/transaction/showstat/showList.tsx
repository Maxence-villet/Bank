import ShowStat from "./showstat"
import RedArrowDown from "../icons/redIconArrowDown";
import PurpleIcon from "../icons/purpleIcon";
import GreenArrow from "../icons/GreenArrow";

const ShowList =({Revenus,Sortie,Transactions}:{Revenus:number,Sortie:number,Transactions:number})=> {
    return(
        <div style={{paddingLeft:"24px"}} className="h-full flex flex-col gap-[24px]">
           <ShowStat title="Revenus" stat={Revenus} icon={<GreenArrow/>} isPriceGain={true}></ShowStat>
           <ShowStat title="Sortie" stat={Sortie} icon={<RedArrowDown />} isPriceGain={true}></ShowStat>
           <ShowStat title="Transactions" stat={Transactions} icon={<PurpleIcon/>} isPriceGain={false}></ShowStat>
        </div>
    )
}
export default ShowList;