export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string; // ISO format or YYYY-MM-DD
  description?: string;
}

export type Role = 'Viewer' | 'Admin';

export interface AppState {
  transactions: Transaction[];
  role: Role;
  searchQuery: string;
  filterType: 'all' | TransactionType;
  sortBy: 'date' | 'amount';
  theme: 'light' | 'dark';
}
