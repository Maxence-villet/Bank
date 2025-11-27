import Icon from "../transaction/icons/icon";

type ShowStatProps = {
    title: string;
    stat: number;
    isPriceGain: boolean;
}
const ShowStat = ({title,stat,isPriceGain}:ShowStatProps) => {
    return (
        <div className="w-[376px] h-[112px]">
            <div className="p-[10px] size-fit-content">
            <Icon
                bgColor={isPriceGain ? "#9ff8f3ff" : "#f3a79aff"}
                iconName={isPriceGain ? "Arrow" : "Shop"}
            />
            </div>
            <h3>{title}</h3>
            <div>{isPriceGain ? stat +'€' : stat }</div>
        </div>
    )
}
export default ShowStat;