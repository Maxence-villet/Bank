import HomeButton from "../SvgIcons/HomeButton";
import CreditCardButton from "../SvgIcons/CreditCardButton";
import ListButton from "../SvgIcons/ListButton";
import SendButton from "../SvgIcons/SendButton";
import AddUserButton from "../SvgIcons/AddUserButton";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useButtonClicked } from "./ButtonContext"; 

const sidebarButtons = [
    { name: "Dashboard", key: "Home", path: "/", Icon: HomeButton }, 
    { name: "Mes comptes", key: "CreditCard", path: "/comptes", Icon: CreditCardButton },
    { name: "Transactions", key: "List", path: "/transactions", Icon: ListButton }, 
    { name: "Virements", key: "Send", path: "/virement/type", Icon: SendButton }, 
    { name: "Beneficiaires", key: "AddUser", path: "/beneficiaires", Icon: AddUserButton },
]

interface isBurgerMenuOpen {
    isOpen: boolean;
}

function Sidebar({ isOpen }: isBurgerMenuOpen) {
    const { buttonClicked, setButtonClicked } = useButtonClicked();
    const location = useLocation(); 
    const navigate = useNavigate();

    const width = isOpen ? 250 : 50;

    const handleButtonClick = (key: string, path: string) => {
        setButtonClicked(key);
        navigate(path);
    }
    
    useEffect(() => {
        const currentButton = sidebarButtons.find(button => button.path === location.pathname);
        
        if (currentButton && currentButton.key !== buttonClicked) {
            setButtonClicked(currentButton.key);
        } else if (location.pathname === "/" && buttonClicked !== "Home") {
             setButtonClicked("Home");
        }
    }, [location.pathname, buttonClicked, setButtonClicked]); 

    const SidebarButton = ({ name, buttonKey, path, Icon }: { name: string, buttonKey: string, path: string, Icon: React.ComponentType<{ fillColor: string }> }) => {
        const isSelected = buttonKey === buttonClicked;

        const commonClasses = "flex items-center gap-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md px-2 w-auto";
        const selectedClasses = "bg-teal-400";
        const unselectedClasses = "hover:bg-gray-100"; 

        const iconFill = isSelected ? "#000" : "#4b5563";
        const textClasses = isSelected ? "font-bold text-black" : "text-gray-600";

        if (isOpen) {
            return (
                <div
                    className={`${commonClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
                    onClick={() => handleButtonClick(buttonKey, path)}
                >
                    <div className="flex flex-row items-center justify-center w-[40px] h-[40px]">
                        <Icon fillColor={iconFill} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={textClasses} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {name}
                        </p>
                    </div>
                </div>
            );
        }
        return (
            <div
                className={`flex items-center justify-center w-[40px] h-[40px] transition-all duration-300 ease-in-out cursor-pointer rounded-md 
                            ${isSelected ? selectedClasses : unselectedClasses}`}
                onClick={() => handleButtonClick(buttonKey, path)}
                title={name} 
            >
                <Icon fillColor={iconFill} />
            </div>
        );
    };

    return (
        <div
            className="h-[calc(100vh-60px)] bg-white fixed z-[8] top-[60px] shadow-sm transition-all duration-300 ease-in-out"
            style={{ width: `${width}px` }}
        >
            <div className="flex flex-col gap-1 py-5 px-1 m-auto">
                {sidebarButtons.map((button) => (
                    <SidebarButton
                        key={button.key}
                        name={button.name}
                        buttonKey={button.key}
                        path={button.path} 
                        Icon={button.Icon}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;