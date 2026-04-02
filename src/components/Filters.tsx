import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { TransactionType } from '../types';

const Filters: React.FC = () => {
  const { searchQuery, setSearchQuery, filterType, setFilterType, sortBy, setSortBy } = useAppContext();

  return (
    <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between transition-colors duration-300">
      
      {/* Search Bar */}
      <div className="relative w-full sm:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-text-muted" />
        </div>
        <input
          type="text"
          placeholder="Search by category or desc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background border border-border text-text text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 outline-none transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-4 w-full sm:w-auto">
        {/* Type Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-text-muted hidden sm:block" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | TransactionType)}
            className="bg-background border border-border text-text text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer transition-colors"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-4 w-4 text-text-muted hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="bg-background border border-border text-text text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer transition-colors"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
