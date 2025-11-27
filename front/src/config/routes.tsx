import LoginPage from "../apps/LoginPage/page";
import RegisterForm from "../components/Register/Register";
import MyAccount from "../apps/MyAccountPage/MyAccount";
import Beneficiary from "../apps/BeneficiaryPage/Beneficiary";
import VirementPage from "../apps/VirementPage/page";
import Transaction from "../apps/TransactionPage/Transaction";



export const routes = [
    {
        path: '/',
        name: 'dashboard',
        isMenuItem: true,
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/comptes',
        name: 'Mes comptes',
        element: <MyAccount />,
        isMenuItem: true,
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/transaction/:accountId',
        name: 'Historique des Transactions',
        element : <Transaction/>,
        isMenuItem: true,
        needNavbar: true,
        needAuth: false
    },
    {
        path: '/transactions/details/:transactionId',
        name: 'Détails de la Transaction',
        // element : my element
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/beneficiaires',
        name: 'Mes bénéficiaires',
        element : <Beneficiary />,
        isMenuItem: true,
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/profil',
        name: 'Mon Profile',
        // element : my element
        isMenuItem: true,
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/virement/type',
        name: 'Effectuer un virement - Type',
        element: <VirementPage />,
        isMenuItem: true,
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/virement/beneficiaire',
        name: 'Effectuer un virement - Beneficiaire',
        // element : my element
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/virement/confirmation',
        name: 'Effectuer un virement - Confirmation',
        // element : my element
        needNavbar: true,
        needAuth: true
    },
    {
        path: '/connexion',
        name: 'Connexion',
        element: <LoginPage />,
        needNavbar: false,
        needAuth: false

    },
    {
        path: '/inscription',
        name: 'Inscription',
        element : <RegisterForm/>,
        needNavbar: false,
        needAuth: false
    }
]