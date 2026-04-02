import React from 'react';
import Layout from '../components/Layout';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import Insights from '../components/Insights';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-2xl font-bold text-text mb-1">Financial Overview</h2>
          <p className="text-text-muted text-sm mb-6">Track and analyze your income and expenses.</p>
        </div>
        
        <SummaryCards />
        
        <div className="grid grid-cols-1 gap-6">
          <Charts />
          <Insights />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text">Transactions</h2>
          </div>
          <Filters />
          <TransactionTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
