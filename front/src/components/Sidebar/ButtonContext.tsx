import { useState, createContext, useContext, type ReactNode, use } from "react";

interface ButtonContextType {
    buttonClicked: string;
    setButtonClicked: (key: string) => void;
}

const ButtonClickedContext = createContext<ButtonContextType | undefined>(undefined);

export const useButtonClicked = () => {
    const context = useContext(ButtonClickedContext);
    if (!context) {
        throw new Error('useButtonClicked must be used within a ButtonContextProvider');
    }
    return context;
}

interface ButtonContextProviderProps {
    children: ReactNode;
}

export const ButtonContextProvider = ({ children }: ButtonContextProviderProps) => {
    const  [buttonClicked, setButtonClicked] = useState("Home");

    const value = {
        buttonClicked,
        setButtonClicked,
    };

    return (
        <ButtonClickedContext.Provider value={value}>
            {children}
        </ButtonClickedContext.Provider>
    );
}