import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useState, useMemo } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { routes } from "../../config/routes";
import { ButtonContextProvider } from "../Sidebar/ButtonContext";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";


function AuthenticatedRoutes() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();
    const { pathname } = location;

    const currentRoute = useMemo(() => {
        return routes.find(route => route.path === pathname);
    }, [pathname]);

    const navbar = currentRoute ? currentRoute.needNavbar : false;
    const requiresAuth = currentRoute ? currentRoute.needAuth : false;

    // Rediriger vers la page de connexion si la route nécessite une authentification mais que l'utilisateur n'est pas connecté
    if (requiresAuth && !isAuthenticated) {
        return <Navigate to="/connexion" replace />;
    }

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

function Layout() {
    return (
        <AuthProvider>
            <AuthenticatedRoutes />
        </AuthProvider>
    );
}

export default Layout;