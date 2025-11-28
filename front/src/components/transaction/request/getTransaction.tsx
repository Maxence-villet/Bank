import { useQuery } from "@tanstack/react-query";

export const GetTransactionsPerAccount = (accountId: string) => {
  return useQuery({
    queryKey: ["transactions", accountId],
    queryFn: async () => {
      const res = await fetch(`/by_account/${accountId}`);

      if (!res.ok) {
        throw new Error("Erreur lors du fetch des transactions");
      }

      return res.json(); 
    },
    enabled: !!accountId, 
  });
};
