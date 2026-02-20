import React from 'react';

interface SplitScreenProps {
  leftTitle: string;
  rightTitle: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{leftTitle}</h3>
        <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800 p-4">
          {leftContent}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">{rightTitle}</h3>
        <div className="flex-1 bg-blue-900/10 rounded-xl border border-blue-900/30 p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none" />
          {rightContent}
        </div>
      </div>
    </div>
  );
};
