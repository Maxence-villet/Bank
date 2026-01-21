import Icon from "./icons/icon"
type CardProps = {
    title: string;
    subtitle: string;
    isGain: boolean;
    price: number;
}

const Card = ({title, subtitle, isGain, price}: CardProps) => {
  const pricestr:string = price.toFixed(2).replace('.', ',')
  return(
<section className="flex items-center gap-[24px] h-[50px]">
  {/* ICON */}
  <Icon
    bgColor={"#8C9C9C"}
    iconName={subtitle.toLowerCase() === "virement" ? "Arrow" : "Shop"}
  />

  {/* TEXT + PRICE */}
  <div className="flex items-start w-full h-full">

    {/* LEFT SIDE (title + subtitle) */}
    <div className="flex flex-col flex-1 items-start h-[46px] justify-between">
  <h2 className="font-inter font-normal text-[18px] h-[20px] leading-[150%] tracking-[-0.01em] text-[#002222] m-0">
    {title}
  </h2>

  <p className="font-inter font-normal text-[16px] h-[18px] leading-[150%] tracking-[-0.01em] text-[#8C9C9C] m-0">
    {subtitle}
  </p>
</div>

    {/* PRICE (à droite) */}
    <span
      className={`font-inter font-normal text-[22px] h-[35px] leading-[160%] tracking-[-0.01em]
      ${isGain ? "text-[#58C5C3]" : "text-[#EB7C3F]"}`}
    >
     { isGain ? `+${pricestr} €` : `-${pricestr} €`}
    </span>

  </div>
</section>


  ) 
}
export default Card;