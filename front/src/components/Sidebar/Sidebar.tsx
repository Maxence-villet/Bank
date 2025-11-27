    import HomeButton from "../SvgIcons/HomeButton";
    import CreditCardButton from "../SvgIcons/CreditCardButton";
    import ListButton from "../SvgIcons/ListButton";
    import SendButton from "../SvgIcons/SendButton";
    import AddUserButton from "../SvgIcons/AddUserButton";
    import { useState, createContext, useContext, useEffect, type ReactNode } from "react";


    interface ButtonContextType {
        buttonClicked: string;
        setButtonClicked: (key: string) => void;
    }

    const sidebarButtons = [
        { name: "Dashboard", key: "Home", Icon: HomeButton },
        { name: "Mes comptes", key: "CreditCard", Icon: CreditCardButton },
        { name: "Transactions", key: "List", Icon: ListButton },
        { name: "Virements", key: "Send", Icon: SendButton },
        { name: "Beneficiaires", key: "AddUser", Icon: AddUserButton },
    ]

    const ButtonClickedContext = createContext<ButtonContextType>({
        buttonClicked: "Home",
        setButtonClicked: () => {}
    }   );

export const useButtonClicked = () => useContext(ButtonClickedContext);

    interface isBurgerMenuOpen {
        isOpen: boolean;
    }

    interface ButtonContextProviderProps {
        children: ReactNode;
    }

    function Sidebar({ isOpen }: isBurgerMenuOpen) {
        const [buttonClicked, setButtonClicked] = useState("Home");

        const width = isOpen ? 250 : 50;

        const value = {
            buttonClicked,
            setButtonClicked,
        };

        const handleButtonClick = (key: string) => {
            setButtonClicked(key);
        }

        const SidebarButton = ({ name, buttonKey, Icon }: { name: string, buttonKey: string, Icon: React.ComponentType<{ fillColor: string }> }) => {
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
                        onClick={() => handleButtonClick(buttonKey)}
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
                    onClick={() => handleButtonClick(buttonKey)}
                    title={name} 
                >
                    <Icon fillColor={iconFill} />
                </div>
            );
        };


        return (
            <>
            <ButtonClickedContext value={value}>
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
                                    Icon={button.Icon}
                                />
                            ))}
                        </div>
                </div>
            </ButtonClickedContext>
            </>
        )    
    }

    export default Sidebar;