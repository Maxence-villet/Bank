import { useEffect, useState } from "react";
import Account from "../Account/Account";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

interface AccountType {
    id: number,
    name: string,
    amount: number,
    iban: string,
}

function AllAccounts() {
    const { token } = useAuth();

    const { data: accounts = [] } = useQuery<AccountType[]>({
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

    const formatIban = (iban: string) => {
        if (!iban) return '';
        const first16 = iban.slice(0, 16);
        return first16.match(/.{1,4}/g)?.join(' ') ?? first16;
    }

    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl gap-8">
                {accounts.map((account) => (
                    <Account 
                        key={account.id}
                        id={account.id}
                        name={account.name}
                        amount={account.amount}
                        iban={formatIban(account.iban)}
                    />
                ))}
            </div>
        </>
    )
}

export default AllAccounts;