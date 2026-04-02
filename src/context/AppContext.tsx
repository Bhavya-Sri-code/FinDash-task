import React, { createContext, useContext, useEffect } from 'react';
import type { Transaction, AppState, Role, TransactionType } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialTransactions } from '../data/mockData';

interface AppContextType extends AppState {
  setRole: (role: Role) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: 'all' | TransactionType) => void;
  setSortBy: (sort: 'date' | 'amount') => void;
  toggleTheme: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('finance_transactions', initialTransactions);
  const [role, setRole] = useLocalStorage<Role>('finance_role', 'Viewer');
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('finance_theme', 'light');
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState<'all' | TransactionType>('all');
  const [sortBy, setSortBy] = React.useState<'date' | 'amount'>('date');

  useEffect(() => {
    // Apply dark mode class to html element
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const value = {
    transactions,
    role,
    searchQuery,
    filterType,
    sortBy,
    theme,
    setRole,
    setSearchQuery,
    setFilterType,
    setSortBy,
    toggleTheme,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
