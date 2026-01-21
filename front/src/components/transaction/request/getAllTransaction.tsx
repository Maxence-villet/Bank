import { useQuery, useQueries } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { apihost } from './reqConfig';
import { mapApiTransactionsToCardData } from './listMapper';

interface Account {
  id: string | number;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}


const fetchAccounts = async (token: string): Promise<Account[]> => {
  const res = await fetch(`${apihost}/accounts/user`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erreur lors de la récupération des comptes');
  return res.json();
};

const fetchTransactions = async (accountId: string | number, token: string) => {
  const res = await fetch(`${apihost}/transaction/by_account/${accountId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Erreur transaction pour compte ${accountId}`);
  return res.json();
};

export const useAllTransactions = () => {
  const { token } = useAuth();

  const accountsQuery = useQuery({
    queryKey: ['accounts'],
    queryFn: () => fetchAccounts(token!),
    enabled: !!token, 
  });

  const accounts = accountsQuery.data || [];

  const transactionQueries = useQueries({
    queries: accounts.map((account) => ({
      queryKey: ['transactions', account.id],
      queryFn: () => fetchTransactions(account.id, token!),
      enabled: !!token && !!account.id,
    })),
  });

  const isLoading = accountsQuery.isLoading || transactionQueries.some(q => q.isLoading);
  const isError = accountsQuery.isError || transactionQueries.some(q => q.isError);

  // Étape A: Récupérer toutes les transactions brutes
  const rawTransactions = isLoading 
    ? undefined 
    : transactionQueries.flatMap(query => query.data || []);

  // Étape B: Formater les données si elles existent
  const myAccountIds = accounts.map(acc => acc.id);
  const formattedData = rawTransactions
    ? mapApiTransactionsToCardData(rawTransactions, myAccountIds)
    : undefined;

  // Étape C: Renvoyer les données formatées
  return {
    data: formattedData, // On renvoie les données formatées
    isLoading,
    isError,
    accounts
  };
};