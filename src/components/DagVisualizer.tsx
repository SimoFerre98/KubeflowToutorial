import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, Brain, BarChart, UploadCloud, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from '../hooks/useTranslation';

export const DagVisualizer: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const t = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const line = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  if (!loaded) {
    return (
      <div className="w-full h-64 bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center p-6 transition-all hover:border-slate-500 hover:bg-slate-900/80">
        <div className="text-slate-400 text-center mb-4">
          <p className="mb-2">{t.dag.noDag}</p>
          <p className="text-sm">{t.dag.loadExample}</p>
        </div>
        <button
          onClick={() => setLoaded(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors font-medium shadow-lg shadow-blue-900/20"
        >
          <UploadCloud className="w-4 h-4" />
          {t.dag.loadExample.includes('Clicca') ? 'Carica Esempio' : 'Load Example DAG'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-8 overflow-hidden relative min-h-[400px]">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-xs text-slate-400 font-mono">{t.dag.status}: RUNNING</span>
      </div>
      
      <div className="text-center mb-8">
        <h3 className="text-white font-medium">{t.dag.title}</h3>
        <p className="text-slate-500 text-sm">{t.dag.subtitle}</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center gap-8 relative z-10"
      >
        {/* Level 1: Ingestion */}
        <Node icon={Database} label={t.dag.nodes.load} status="completed" delay={0} />
        
        <Arrow />

        {/* Level 2: Processing */}
        <Node icon={FileText} label={t.dag.nodes.preprocess} status="completed" delay={1} />
        
        <div className="grid grid-cols-2 gap-16 w-full max-w-lg mx-auto relative">
           {/* Connecting Lines SVG Layer */}
           <svg className="absolute top-[-20px] left-0 w-full h-[140px] pointer-events-none z-0" style={{ overflow: 'visible' }}>
              {/* Split paths */}
              <motion.path 
                d="M 256 0 C 256 30, 128 30, 128 60" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2" 
                variants={line}
              />
              <motion.path 
                d="M 256 0 C 256 30, 384 30, 384 60" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2" 
                variants={line}
              />
              {/* Merge paths */}
              <motion.path 
                d="M 128 150 C 128 180, 256 180, 256 200" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2" 
                variants={line}
              />
              <motion.path 
                d="M 384 150 C 384 180, 256 180, 256 200" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2" 
                variants={line}
              />
           </svg>

           {/* Level 3: Parallel Training */}
           <div className="flex flex-col items-center pt-10">
             <Node icon={Brain} label={t.dag.nodes.trainA} sub="(Random Forest)" status="running" delay={2} />
           </div>
           <div className="flex flex-col items-center pt-10">
             <Node icon={Brain} label={t.dag.nodes.trainB} sub="(XGBoost)" status="running" delay={2.2} />
           </div>
        </div>

        {/* Level 4: Evaluation (Placeholder for merge) */}
        <div className="pt-8">
            <Node icon={BarChart} label={t.dag.nodes.evaluate} status="pending" delay={3.5} />
        </div>

      </motion.div>
    </div>
  );
};

const Arrow = () => (
  <motion.div 
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 32 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="w-0.5 bg-slate-700 relative"
  >
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-slate-700">
      ▼
    </div>
  </motion.div>
);

interface NodeProps {
  icon: React.ElementType;
  label: string;
  sub?: string;
  status: 'completed' | 'running' | 'pending';
  delay: number;
}

const Node: React.FC<NodeProps> = ({ icon: Icon, label, sub, status, delay }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay, type: "spring", stiffness: 260, damping: 20 }}
      className={clsx(
        "relative z-10 flex flex-col items-center p-4 rounded-xl border-2 w-48 transition-all duration-500",
        status === 'completed' && "bg-green-900/20 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
        status === 'running' && "bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] animate-pulse",
        status === 'pending' && "bg-slate-800 border-slate-700 opacity-60"
      )}
    >
      <div className={clsx(
        "p-2 rounded-full mb-2",
        status === 'completed' && "bg-green-500/20 text-green-400",
        status === 'running' && "bg-blue-500/20 text-blue-400",
        status === 'pending' && "bg-slate-700 text-slate-500"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={clsx(
        "font-medium text-sm",
        status === 'pending' ? "text-slate-500" : "text-slate-200"
      )}>{label}</span>
      {sub && <span className="text-xs text-slate-500 mt-1">{sub}</span>}
      
      {status === 'completed' && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-black rounded-full p-0.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
