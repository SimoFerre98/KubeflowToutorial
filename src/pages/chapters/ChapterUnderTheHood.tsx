import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { Server, FileCode, Box, Activity, ArrowRight } from 'lucide-react';

export const ChapterUnderTheHood: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const t = useTranslation();
  const content = t.chapterContent.underthehood;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    markChapterCompleted('underthehood');
    return () => clearInterval(interval);
  }, []);

  const Step = ({ icon: Icon, label, sub }: { icon: any, label: string, sub?: string }) => (
    <div className="flex flex-col items-center gap-3 relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-xl">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <div className="text-center">
        <p className="text-white font-medium">{label}</p>
        {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      </div>
    </div>
  );

  const Arrow = () => (
    <div className="hidden md:flex items-center justify-center w-12 text-slate-600">
      <ArrowRight className="w-6 h-6" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p1 as string }} />

      <div className="bg-slate-900/50 p-12 rounded-xl border border-slate-800 mb-12 overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-w-[600px]">
            <Step icon={FileCode} label="Python Code" sub="@dsl.pipeline" />
            <Arrow />
            <Step icon={FileCode} label="YAML" sub="Argo Workflow" />
            <Arrow />
            <Step icon={Server} label="K8s API" sub="Submission" />
            <Arrow />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-slate-600"></div>
                    <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                        <Box className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-slate-200">Pod A</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-slate-600"></div>
                    <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                        <Box className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-slate-200">Pod B</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">{content.troubleshootingTitle}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl">
            <h4 className="font-bold text-red-400 mb-2">{content.error1Title}</h4>
            <p className="text-slate-400 text-sm">
                {content.error1Text}
            </p>
        </div>
        <div className="bg-yellow-900/10 border border-yellow-900/30 p-6 rounded-xl">
            <h4 className="font-bold text-yellow-400 mb-2">{content.error2Title}</h4>
            <p className="text-slate-400 text-sm">
                {content.error2Text}
            </p>
        </div>
      </div>
    </motion.div>
  );
};
