import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import AllAccounts from "../../components/Account/AllAccounts";
import AddAccount from "../../components/Account/AddAccount";

function MyAccount() {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: accounts = [] } = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            if (!token) throw new Error('No token');
            const response = await fetch('http://localhost:8000/accounts/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch accounts');
            }
            return response.json();
        },
        enabled: !!token,
    });

    const totalAccounts = accounts.reduce(
        (sum: number, account: { amount?: number }) => sum + ((account.amount || 0) / 100),
        0
    );

    const refetchAccounts = () => {
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
    };

    return (
        <div className="pr-7 pl-16">
            <div className="flex flex-row justify-between items-center mb-12">
                <div className="text-left flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Mes comptes</h1>
                    <div className="text-xl flex flex-column gap-1 text-gray-400">
                        <p>Totale des actifs:</p>
                        <h3 className="font-bold">{totalAccounts.toFixed(2)}€</h3>   
                    </div>
                </div>
                <AddAccount />
            </div>
            
            <AllAccounts accounts={accounts} onClose={refetchAccounts} />
        </div>
    );
}

export default MyAccount;