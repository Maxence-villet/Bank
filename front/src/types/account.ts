export interface Account {
  id: string;
  amount: number;
  iban: string;
  open_at: string; // ISO date string
  name?: string;
}
