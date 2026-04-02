import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Transaction, TransactionType } from '../types';
import { useAppContext } from '../context/AppContext';
import { format, parseISO } from 'date-fns';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transaction }) => {
  const { addTransaction, updateTransaction } = useAppContext();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDate(format(parseISO(transaction.date), 'yyyy-MM-dd'));
      setDescription(transaction.description || '');
    } else {
      setType('expense');
      setAmount('');
      setCategory('');
      setDate(format(new Date(), 'yyyy-MM-dd'));
      setDescription('');
    }
  }, [transaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || !category || !date) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const payload = {
      type,
      amount: Number(amount),
      category,
      date: new Date(date).toISOString(),
      description
    };

    if (transaction) {
      updateTransaction({ ...transaction, ...payload });
    } else {
      addTransaction(payload);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div 
        className="bg-surface w-full max-w-md rounded-2xl shadow-xl border border-border flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text hover:bg-background p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
                    type === 'income' 
                      ? 'bg-success/10 border-success/50 text-success' 
                      : 'bg-background border-border text-text hover:bg-border'
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
                    type === 'expense' 
                      ? 'bg-danger/10 border-danger/50 text-danger' 
                      : 'bg-background border-border text-text hover:bg-border'
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Amount *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-background border border-border text-text rounded-lg block p-2.5 focus:ring-primary focus:border-primary outline-none transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Category *</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Salary, Rent, Groceries"
                className="w-full bg-background border border-border text-text rounded-lg block p-2.5 focus:ring-primary focus:border-primary outline-none transition-colors"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-background border border-border text-text rounded-lg block p-2.5 focus:ring-primary focus:border-primary outline-none transition-colors [color-scheme:dark_light]"
                style={{ colorScheme: 'var(--color-scheme)' }} // a small hack to make calendar icon visible depends on theme, actually tailwind class is better
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details..."
                rows={2}
                className="w-full bg-background border border-border text-text rounded-lg block p-2.5 focus:ring-primary focus:border-primary outline-none transition-colors custom-scrollbar"
              />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-background hover:bg-border text-text font-medium rounded-lg transition-colors border border-border text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
            >
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
