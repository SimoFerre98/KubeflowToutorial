import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { Box, Database, FileText, ArrowRight, ArrowDown } from 'lucide-react';

export const ChapterArtifacts: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const t = useTranslation();
  const content = t.chapterContent.artifacts;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    markChapterCompleted('artifacts');
    return () => clearInterval(interval);
  }, []);

  const code = `from kfp.dsl import Input, Output, Dataset, Model

@dsl.component
def train_model(
    dataset: Input[Dataset],
    model: Output[Model]
):
    # Read from Input Artifact
    with open(dataset.path, 'r') as f:
        data = f.read()
    
    # Train...
    
    # Write to Output Artifact
    with open(model.path, 'w') as f:
        f.write('trained_model_binary')`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p1 as string }} />

      <div className="bg-slate-900/50 p-12 rounded-xl border border-slate-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Background Connection Line */}
        <div className="absolute top-1/2 left-20 right-20 h-1 bg-slate-800 -z-10 hidden md:block"></div>

        {/* Component A */}
        <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-blue-900/20 border-2 border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Box className="w-10 h-10 text-blue-400" />
            </div>
            <div className="text-center">
                <span className="text-white font-bold block">Component A</span>
                <span className="text-xs text-slate-400">Producer</span>
            </div>
            <div className="absolute -right-16 top-8 hidden md:flex flex-col items-center">
                <span className="text-[10px] text-blue-400 font-mono mb-1">WRITE</span>
                <ArrowRight className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
        </div>

        {/* Object Storage (MinIO) */}
        <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center shadow-2xl relative">
                <Database className="w-10 h-10 text-slate-300" />
                <div className="absolute -top-2 -right-2 bg-green-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                    S3 / MinIO
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700 backdrop-blur-sm">
                <FileText className="w-5 h-5 text-green-400" />
                <span className="text-xs font-mono text-slate-300">dataset.csv</span>
            </div>
        </div>

        {/* Component B */}
        <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="absolute -left-16 top-8 hidden md:flex flex-col items-center">
                <span className="text-[10px] text-green-400 font-mono mb-1">READ</span>
                <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
            </div>
            <div className="w-20 h-20 rounded-2xl bg-green-900/20 border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Box className="w-10 h-10 text-green-400" />
            </div>
            <div className="text-center">
                <span className="text-white font-bold block">Component B</span>
                <span className="text-xs text-slate-400">Consumer</span>
            </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">{content.diagramTitle}</h3>
      <CodeBlock code={code} language="python" highlights={[1, 5, 6, 9, 15]} />
    </motion.div>
  );
};
