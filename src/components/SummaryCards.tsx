import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { twMerge } from 'tailwind-merge';

const SummaryCards: React.FC = () => {
  const { transactions } = useAppContext();

  const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.totalIncome += curr.amount;
          acc.totalBalance += curr.amount;
        } else {
          acc.totalExpenses += curr.amount;
          acc.totalBalance -= curr.amount;
        }
        return acc;
      },
      { totalBalance: 0, totalIncome: 0, totalExpenses: 0 }
    );
  }, [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: <DollarSign className="h-6 w-6" />,
      colorClass: 'text-primary bg-primary/10',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: <ArrowUpRight className="h-6 w-6" />,
      colorClass: 'text-success bg-success/10',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: <ArrowDownRight className="h-6 w-6" />,
      colorClass: 'text-danger bg-danger/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-surface rounded-2xl p-6 shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow duration-300"
        >
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-text">
              ${card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className={twMerge('p-3 rounded-xl', card.colorClass)}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
