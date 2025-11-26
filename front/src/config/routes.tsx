import React from 'react';

const AccountList = () => <div>Mes comptes</div>;
const TransactionHistory = () => <div>Historique des transactions</div>;
const TransactionDetails = () => <div>Détails de la transaction</div>;
const TransferStart = () => <div>Effectuer un virement (Type)</div>;
const BeneficiarySelection = () => <div>Choisir un bénéficiaire</div>;
const TransferAmount = () => <div>Choisir le montant</div>;
const TransferConfirmation = () => <div>Confirmation du virement</div>;
const BeneficiaryList = () => <div>Mes bénéficiaires</div>;
const Profile = () => <div>Profil utilisateur</div>;
const Login = () => <div>Connexion</div>;
const Register = () => <div>Inscription</div>;

export interface RouteConfig {
  path: string;
  element: React.FC;
  name: string;
  isMenuItem?: boolean;
}

export const AppRoutes: RouteConfig[] = [
  {
    path: '/',
    element: AccountList,
    name: 'Mes Comptes',
    isMenuItem: true,
  },
  {
    path: '/transactions/:accountId',
    element: TransactionHistory,
    name: 'Historique des Transactions',
  },
  {
    path: '/transactions/details/:transactionId',
    element: TransactionDetails,
    name: 'Détails de la Transaction',
  },
  {
    path: '/beneficiaires',
    element: BeneficiaryList,
    name: 'Mes Bénéficiaires',
    isMenuItem: true,
  },
  {
    path: '/profil',
    element: Profile,
    name: 'Mon Profil',
    isMenuItem: true,
  },
  {
    path: '/virement/type',
    element: TransferStart,
    name: 'Effectuer un Virement - Type',
  },
  {
    path: '/virement/beneficiaire',
    element: BeneficiarySelection,
    name: 'Effectuer un Virement - Bénéficiaire',
  },
  {
    path: '/virement/montant',
    element: TransferAmount,
    name: 'Effectuer un Virement - Montant',
  },
  {
    path: '/virement/confirmation',
    element: TransferConfirmation,
    name: 'Effectuer un Virement - Confirmation',
  },
  {
    path: '/connexion',
    element: Login,
    name: 'Connexion',
  },
  {
    path: '/inscription',
    element: Register,
    name: 'Inscription',
  },
];