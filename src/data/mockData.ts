import { v4 as uuidv4 } from 'uuid';
import type { Transaction } from '../types';

export const initialTransactions: Transaction[] = [
  {
    id: uuidv4(),
    amount: 5000,
    category: 'Salary',
    type: 'income',
    date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    description: 'Monthly salary',
  },
  {
    id: uuidv4(),
    amount: 1200,
    category: 'Rent',
    type: 'expense',
    date: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    description: 'Apartment rent',
  },
  {
    id: uuidv4(),
    amount: 150,
    category: 'Utilities',
    type: 'expense',
    date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
    description: 'Electric bill',
  },
  {
    id: uuidv4(),
    amount: 300,
    category: 'Groceries',
    type: 'expense',
    date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    description: 'Weekly grocery run',
  },
  {
    id: uuidv4(),
    amount: 250,
    category: 'Freelance',
    type: 'income',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    description: 'Web design project',
  },
  {
    id: uuidv4(),
    amount: 80,
    category: 'Entertainment',
    type: 'expense',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    description: 'Movie night',
  },
  {
    id: uuidv4(),
    amount: 50,
    category: 'Transportation',
    type: 'expense',
    date: new Date().toISOString(),
    description: 'Gas',
  },
];
