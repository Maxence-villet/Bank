import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await fetch("/accounts/user");
      if (!res.ok) throw new Error("Erreur API comptes");
      return res.json();
    },
  });
};
