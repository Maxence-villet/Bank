import Icon from "../icons/icon";

type ShowStatProps = {
    title: string;
    stat: number;
    isPriceGain: boolean;
}
const ShowStat = ({title,stat,isPriceGain}:ShowStatProps) => {
    return (
        <div style={{ padding: '16px 24px 16px 24px' }} className="w-[376px] h-[112px] flex flex-row rounder-[16px]  rounded-[16px] bg-white">
            <div className="size-fit-content">
                <Icon
                    bgColor={isPriceGain ? "#9ff8f3ff" : "#f3a79aff"}
                    iconName={isPriceGain ? "Arrow" : "Shop"}
                />
            </div>
            <div className="text-[16px] pl-[16px]">
                <h3>{title}</h3>
                <p className="text-[40px] font-bold">{isPriceGain ? `${stat}€` : stat}</p>
            </div>
        </div>
    )
}
export default ShowStat;