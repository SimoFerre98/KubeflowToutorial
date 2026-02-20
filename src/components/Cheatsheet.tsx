import React, { useState } from 'react';
import { FileText, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { CodeBlock } from './CodeBlock';

export const Cheatsheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslation();

  const snippets = [
    {
      title: t.cheatsheet.component,
      code: `@dsl.component(base_image='python:3.9')
def my_component(message: str) -> str:
    return message`
    },
    {
      title: t.cheatsheet.pipeline,
      code: `@dsl.pipeline(name='My Pipeline')
def pipeline(message: str):
    task = my_component(message=message)`
    },
    {
      title: t.cheatsheet.compile,
      code: `from kfp import compiler
compiler.Compiler().compile(
    pipeline_func=pipeline,
    package_path='pipeline.yaml'
)`
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg hover:shadow-blue-500/20 transition-all z-50 flex items-center gap-2"
      >
        <FileText className="w-6 h-6" />
        <span className="font-medium hidden md:inline">{t.cheatsheet.title}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-full md:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">{t.cheatsheet.title}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {snippets.map((snippet, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
                      {snippet.title}
                    </h3>
                    <CodeBlock code={snippet.code} language="python" />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
