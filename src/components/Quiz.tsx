import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface QuizProps {
  quiz: QuizQuestion;
  onComplete: (success: boolean) => void;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === quiz.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onComplete(correct);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setIsCorrect(false);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 my-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-blue-500/10 p-2 rounded-lg">
            <HelpCircle className="w-6 h-6 text-blue-400" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">Knowledge Check</h3>
            <p className="text-slate-300">{quiz.question}</p>
        </div>
      </div>

      <div className="space-y-3">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && setSelectedOption(index)}
            disabled={isSubmitted}
            className={clsx(
              "w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center group",
              selectedOption === index 
                ? "border-blue-500 bg-blue-500/10 text-white" 
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-700",
              isSubmitted && index === quiz.correctAnswer && "border-green-500 bg-green-500/10 text-green-400",
              isSubmitted && selectedOption === index && !isCorrect && "border-red-500 bg-red-500/10 text-red-400",
              isSubmitted && index !== quiz.correctAnswer && selectedOption !== index && "opacity-50"
            )}
          >
            <span>{option}</span>
            {isSubmitted && index === quiz.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500" />}
            {isSubmitted && selectedOption === index && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end items-center gap-4">
        {isSubmitted && (
            <div className={clsx("text-sm font-medium", isCorrect ? "text-green-400" : "text-red-400")}>
                {isCorrect ? "Correct! Well done." : "Incorrect. Try again."}
            </div>
        )}
        
        {!isSubmitted ? (
            <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Submit Answer
            </button>
        ) : !isCorrect ? (
            <button
                onClick={handleRetry}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
                Retry
            </button>
        ) : null}
      </div>
      
      {isSubmitted && isCorrect && quiz.explanation && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-green-900/20 border border-green-900/50 rounded-lg text-green-200 text-sm"
          >
              <p className="font-semibold mb-1">Explanation:</p>
              {quiz.explanation}
          </motion.div>
      )}
    </div>
  );
};
