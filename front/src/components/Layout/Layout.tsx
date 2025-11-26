import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useState } from "react";

function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };  


    return (
        <>
        <Header onClickBurger={handleMenuClick}/>
        <div>
            <div>
                <Sidebar isOpen={isOpen}/>
            </div>
            <div>

            </div>
        </div>
        </>
    )
}

export default Layout;