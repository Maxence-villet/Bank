import { useQuery } from "@tanstack/react-query";
import { GetTransactionsPerAccount } from "./getTransaction";
import { useAccounts } from "./getAccountId";

export const useAllTransactions = () => {
  const { data: accounts, isLoading: loadingAccounts } = useAccounts();

  return useQuery({
    queryKey: ["all-transactions"],
    enabled: !!accounts && !loadingAccounts,
    queryFn: async () => {
      const accountIds = accounts.map((acc: { id: string; }) => acc.id);

      const results = await Promise.allSettled(
        accountIds.map((id: string) => GetTransactionsPerAccount(id))
      );

      const merged = results
        .filter((r: { status: string; }) => r.status === "fulfilled")
        .flatMap((r) => (r.status === "fulfilled" ? r.value : []));

      return merged;
    },
  });
};


