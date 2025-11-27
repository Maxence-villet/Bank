import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "../../config/routes";
import { ButtonContextProvider } from "../Sidebar/ButtonContext";


function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };  

    const location = useLocation();
    const { pathname } = location;


    const navbar = useMemo(() => {
        const currentRoute = routes.find(route => route.path === pathname);
        return currentRoute ? currentRoute.needNavbar : false;
    }, [pathname, routes]);

    const sidebarWidth = isOpen ? '250px' : '50px';
    const contentWidthClass = `w-[calc(100vw-${sidebarWidth})]`;

    return (
        <>
        {navbar === true ?
            <>
            <ButtonContextProvider>
                <Header onClickBurger={handleMenuClick}/>
                <Sidebar isOpen={isOpen}/> 
                 <main className={`h-[calc(100vh-60px)] 
                    ${isOpen ? 'ml-[250px]' : 'ml-[50px]'} 
                    ${contentWidthClass} 
                    overflow-auto transition-all duration-300 ease-in-out pt-[60px] bg-[#F7FCFC]`}>

                    <Routes>
                        {routes.map((route, index) => {
                            return (
                                <Route key={index} path={route.path} element={route.element} />
                            )
                        })}
                    </Routes>
                </main>
                </ButtonContextProvider>
            </> :  
            <>
            <main>
                    <Routes>
                        {routes.map((route, index) => {
                            return (
                                <Route key={index} path={route.path} element={route.element} />
                            )
                        })}
                    </Routes>
                </main>
            </>
        }
         
        </>
    )
}

export default Layout;