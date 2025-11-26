import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };  

    const sidebarWidth = isOpen ? '250px' : '50px';
    const contentWidthClass = `w-[calc(100vw-${sidebarWidth})]`;

    return (
        <>
        <Header onClickBurger={handleMenuClick}/>

        <Sidebar isOpen={isOpen}/>

            <main className={`h-[calc(100vh-60px)] ml-[${sidebarWidth}] ${contentWidthClass} overflow-auto transition-all duration-300 ease-in-out pt-[60px]`}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<p className="p-4">Bienvenue ! Naviguez vers /hello pour voir le composant.</p>} />
                        <Route path="/Account" element={<p className="p-4">Bienvenue ! Naviguez vers /hello pour voir le composant.</p>} />
                        <Route path="/" element={<p className="p-4">Bienvenue ! Naviguez vers /hello pour voir le composant.</p>} />
                        <Route path="/" element={<p className="p-4">Bienvenue ! Naviguez vers /hello pour voir le composant.</p>} />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    )
}

export default Layout;