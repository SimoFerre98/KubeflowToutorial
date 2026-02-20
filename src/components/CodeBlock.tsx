import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-yaml';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language: 'python' | 'yaml';
  showCopyButton?: boolean;
  filename?: string;
  highlights?: number[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  showCopyButton = true, 
  filename,
  highlights = []
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers or if permission is denied
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-[#1d1f21] my-4 shadow-lg group">
      {filename && (
        <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex justify-between items-center">
          <span>{filename}</span>
        </div>
      )}
      
      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
          aria-label="Copy code"
        >
          <AnimatePresence mode='wait'>
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Check className="w-4 h-4 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      )}

      <div className="overflow-x-auto p-4 text-sm font-mono leading-relaxed relative">
        <pre className={`language-${language} !bg-transparent !m-0 !p-0`}>
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
        {highlights.length > 0 && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4">
                {code.split('\n').map((_, i) => (
                    highlights.includes(i + 1) && (
                        <div 
                            key={i} 
                            className="absolute left-0 w-full bg-blue-500/10 border-l-2 border-blue-500"
                            style={{ top: `${(i * 1.5) + 1}rem`, height: '1.5rem' }} // Approximate line height calculation, might need adjustment based on CSS
                        />
                    )
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
