import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Transaction } from '../types';
import { Edit2, Trash2, ArrowUpRight, ArrowDownRight, FileDown, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import TransactionModal from './TransactionModal';

const TransactionTable: React.FC = () => {
  const { transactions, role, searchQuery, filterType, sortBy, deleteTransaction } = useAppContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Filter and sort logic
  const processedTransactions = transactions
    .filter((t) => {
      const matchesSearch = 
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
    const csvContent = [
      headers.join(','),
      ...processedTransactions.map(t => [
        format(parseISO(t.date), 'yyyy-MM-dd'),
        t.type,
        t.category,
        t.amount,
        `"${t.description || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text">Recent Transactions</h3>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center space-x-1 px-3 py-2 bg-background hover:bg-border text-text text-sm rounded-lg transition-colors border border-border"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          {role === 'Admin' && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              + Add New
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-text">
          <thead className="text-xs text-text-muted uppercase bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Details</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              {role === 'Admin' && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {processedTransactions.length > 0 ? (
              processedTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-text">{format(parseISO(transaction.date), 'MMM dd, yyyy')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${transaction.type === 'income' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {transaction.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-text">{transaction.category}</p>
                        {transaction.description && (
                          <p className="text-xs text-text-muted">{transaction.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${transaction.type === 'income' ? 'text-success' : 'text-text'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-primary hover:text-primary-hover p-2 rounded-full hover:bg-primary/10 transition-colors inline-block"
                        aria-label="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this transaction?')) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                        className="text-danger hover:text-danger p-2 rounded-full hover:bg-danger/10 transition-colors ml-2 inline-block"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 4 : 3} className="px-6 py-12 text-center text-text-muted">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-background rounded-full mb-3">
                      <Search className="h-6 w-6" />
                    </div>
                    <p className="text-base font-medium">No transactions found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={editingTransaction}
        />
      )}
    </div>
  );
};

export default TransactionTable;
