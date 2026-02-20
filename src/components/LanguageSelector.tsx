import React from 'react';
import { useTutorialStore } from '../hooks/useTutorialStore';
import { Languages } from 'lucide-react';
import { Language } from '../types';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTutorialStore();

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Languages className="w-4 h-4 text-slate-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-slate-800 text-slate-200 text-sm rounded border border-slate-700 px-2 py-1 focus:outline-none focus:border-blue-500 w-full"
      >
        <option value="en">English</option>
        <option value="it">Italiano</option>
      </select>
    </div>
  );
};
