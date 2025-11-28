import ButtonDownload from "./buttonDownload";
import DropdownList from "./dropdownList";

const HeaderTransaction = ({title,subtitle}:{title:string,subtitle:string}) => {
    return (
        <div className=" h-[85px]  flex justify-between items-center">
            <div className=" flex flex-col ">
            <h1 className="text-2xl font-bold h-[48px] text-[40px]">{title}Vos Transactions</h1>
            <p style={{ paddingTop: "10px" }} className=" text-[#8C9C9C] h-[27px] ">{subtitle}Gérer tout l’historique de vos transactions</p>
        </div>
        <div  className=" flex flex-row gap-[10px] items-center">
            <DropdownList />
            <ButtonDownload />
            </div>
        </div>
    )
}
export default HeaderTransaction;