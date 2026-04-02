import React, { useMemo } from 'react';
import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { subMonths, isSameMonth, parseISO } from 'date-fns';

const Insights: React.FC = () => {
  const { transactions } = useAppContext();
  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    let highestCategory = 'None';
    let highestAmount = 0;
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = category;
      }
    });
    const now = new Date();
    const lastMonth = subMonths(now, 1);
    let thisMonthExpenses = 0;
    let lastMonthExpenses = 0;
    expenses.forEach(t => {
      const date = parseISO(t.date);
      if (isSameMonth(date, now)) {
        thisMonthExpenses += t.amount;
      } else if (isSameMonth(date, lastMonth)) {
        lastMonthExpenses += t.amount;
      }
    });

    let momMessage = 'Not enough data for monthly comparison.';
    let momTrend: 'up' | 'down' | 'neutral' = 'neutral';

    if (lastMonthExpenses > 0) {
      const diffStr = ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100).toFixed(1);
      const diff = parseFloat(diffStr);
      if (diff > 0) {
        momMessage = `You spent ${Math.abs(diff)}% more this month compared to last month.`;
        momTrend = 'up';
      } else if (diff < 0) {
        momMessage = `Great! You spent ${Math.abs(diff)}% less this month compared to last month.`;
        momTrend = 'down';
      } else {
        momMessage = `Your spending is exactly the same as last month.`;
        momTrend = 'neutral';
      }
    } else if (thisMonthExpenses > 0) {
      momMessage = `You've spent $${thisMonthExpenses.toFixed(2)} this month.`;
    }

    return {
      highestCategory,
      highestAmount,
      momMessage,
      momTrend,
      thisMonthExpenses,
      lastMonthExpenses
    };
  }, [transactions]);

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border mb-8 transition-colors duration-300">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-fuchsia-500" />
        <h3 className="text-lg font-semibold text-text">AI Financial Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${insights.momTrend === 'down' ? 'bg-success/10 text-success' : insights.momTrend === 'up' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
              {insights.momTrend === 'down' ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">Monthly Spending</p>
              <p className="text-text font-medium">{insights.momMessage}</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">Highest Expense Category</p>
              {insights.highestCategory !== 'None' ? (
                <p className="text-text font-medium">
                  Watch out! You spent <span className="font-bold">${insights.highestAmount.toFixed(2)}</span> on <span className="font-bold">{insights.highestCategory}</span>.
                </p>
              ) : (
                <p className="text-text font-medium">No expenses recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
