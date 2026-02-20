import React from 'react';
import { useTutorialStore } from '../hooks/useTutorialStore';
import { chapters } from '../data/chapters';
import { Clock, Trophy, BookOpen, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProgressDashboard: React.FC = () => {
  const { completedChapters, totalTimeSpent, quizResults, resetProgress } = useTutorialStore();

  const totalChapters = chapters.length;
  const completedCount = completedChapters.length;
  const progressPercentage = Math.round((completedCount / totalChapters) * 100);
  
  // Format time (ms -> m:s)
  const minutes = Math.floor(totalTimeSpent / 60000);
  const seconds = Math.floor((totalTimeSpent % 60000) / 1000);
  
  const quizzesTaken = Object.keys(quizResults).length;
  const quizzesPassed = Object.values(quizResults).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-white">Your Progress Dashboard</h2>
        <button 
            onClick={() => {
                if(window.confirm('Are you sure you want to reset all progress?')) {
                    resetProgress();
                }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors border border-slate-700 hover:border-red-900/50"
        >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Progress</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <div>
                <p className="text-slate-400 text-sm">Chapters Completed</p>
                <p className="text-2xl font-bold text-white">{completedCount} / {totalChapters}</p>
            </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
                <Clock className="w-8 h-8 text-purple-400" />
            </div>
            <div>
                <p className="text-slate-400 text-sm">Time Spent</p>
                <p className="text-2xl font-bold text-white">{minutes}m {seconds}s</p>
            </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
                <p className="text-slate-400 text-sm">Quizzes Passed</p>
                <p className="text-2xl font-bold text-white">{quizzesPassed}</p>
            </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6">Chapter Status</h3>
      <div className="space-y-4">
        {chapters.map((chapter) => {
            const isCompleted = completedChapters.includes(chapter.id);
            return (
                <div 
                    key={chapter.id} 
                    className={`p-4 rounded-xl border flex justify-between items-center ${
                        isCompleted 
                            ? "bg-green-900/10 border-green-900/30" 
                            : "bg-slate-800/30 border-slate-800"
                    }`}
                >
                    <div>
                        <h4 className={`font-medium ${isCompleted ? "text-green-400" : "text-slate-300"}`}>
                            {chapter.title}
                        </h4>
                        <p className="text-sm text-slate-500">{chapter.description}</p>
                    </div>
                    <div>
                        {isCompleted ? (
                            <span className="px-3 py-1 bg-green-900/20 text-green-400 text-xs rounded-full border border-green-900/30">
                                Completed
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-slate-800 text-slate-500 text-xs rounded-full border border-slate-700">
                                Pending
                            </span>
                        )}
                    </div>
                </div>
            );
        })}
      </div>
    </motion.div>
  );
};
