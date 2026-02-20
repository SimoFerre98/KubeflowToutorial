import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, Circle, Lock, BookOpen } from 'lucide-react';
import { chapters } from '../data/chapters';
import { useTutorialStore } from '../hooks/useTutorialStore';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSelector } from './LanguageSelector';
import clsx from 'clsx';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  const { completedChapters } = useTutorialStore();
  const t = useTranslation();

  return (
    <aside className={clsx("w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 h-screen overflow-y-auto flex flex-col", className)}>
      <div className="p-6 border-b border-slate-800/50 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <span>{t.sidebar.title}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">{t.sidebar.subtitle}</p>
        </div>
      </div>
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {chapters.map((chapter, index) => {
            const isCompleted = completedChapters.includes(chapter.id);
            // Allow skipping: removed isLocked check
            const chapterTitle = t.chapters[chapter.id]?.title || chapter.title;
            
            return (
              <li key={chapter.id}>
                <NavLink
                  to={`/tutorial/${chapter.id}`}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 p-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    )
                  }
                  onClick={(e) => {
                    if (onClose) onClose();
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 shrink-0" />
                  )}
                  <span className="text-sm font-medium">{chapterTitle}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="shrink-0 w-full p-4 border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-md space-y-4">
        <LanguageSelector />
        <NavLink 
          to="/progress" 
          className={({ isActive }) => 
            clsx(
              "block p-3 rounded-lg text-center text-sm font-medium transition-colors",
              isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            )
          }
        >
          {t.sidebar.viewProgress}
        </NavLink>
      </div>
    </aside>
  );
};
