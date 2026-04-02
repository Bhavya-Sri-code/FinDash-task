import React from 'react';
import { Moon, Sun, Wallet } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { Role } from '../types';

const Header: React.FC = () => {
  const { role, setRole, theme, toggleTheme } = useAppContext();

  return (
    <header className="bg-surface shadow-sm border-b border-border sticky top-0 z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Wallet className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            FinDash
          </h1>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="role-select" className="text-sm font-medium text-text-muted hidden sm:block">
              Role:
            </label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="bg-background border border-border text-text text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 transition-colors cursor-pointer outline-none"
            >
              <option value="Viewer">Viewer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-muted hover:bg-background hover:text-text transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
