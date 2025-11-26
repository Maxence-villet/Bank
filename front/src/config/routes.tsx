import Hello from "../apps/Hello/pages";
import Hello2 from "../apps/Hello2/pages";
import Hello3 from "../apps/Hello3/pages";
import LoginPage from "../apps/LoginPage/page";



export const routes = [
    {
        path: '/',
        name: 'dashboard',
        isMenuItem: true,
        element: <Hello />,
        needNavbar: true
    },
    {
        path: '/account',
        name: 'Mes comptes',
        element: <Hello2 />,
        needNavbar: true
    },
    {
        path: '/transaction/:accountId',
        name: 'Historique des Transactions',
        // element : my element
        needNavbar: true
    },
    {
        path: '/transactions/details/:transactionId',
        name: 'Détails de la Transaction',
        // element : my element
        needNavbar: true
    },
    {
        path: '/beneficiaires',
        name: 'Mes bénéficiaires',
        // element : my element
        isMenuItem: true,
        needNavbar: true
    },
    {
        path: '/profil',
        name: 'Mon Profile',
        // element : my element
        isMenuItem: true,
        needNavbar: true
    },
    {
        path: '/virement/type',
        name: 'Effectuer un virement - Type',
        // element : my element
        isMenuItem: true,
        needNavbar: true
    },
    {
        path: '/virement/beneficiaire',
        name: 'Effectuer un virement - Beneficiaire',
        // element : my element
        needNavbar: true
    },
    {
        path: '/virement/confirmation',
        name: 'Effectuer un virement - Confirmation',
        // element : my element
        needNavbar: true
    },
    {
        path: '/connexion',
        name: 'Connexion',
        element: <LoginPage />,
        needNavbar: false
        
    },
    {
        path: '/inscription',
        name: 'Inscription',
        element: <Hello3 />,
        needNavbar: false
    }
]