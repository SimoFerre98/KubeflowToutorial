import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { DagVisualizer } from '../../components/DagVisualizer';

export const ChapterPipeline: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const t = useTranslation();
  const content = t.chapterContent.pipeline;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    markChapterCompleted('pipeline');
    return () => clearInterval(interval);
  }, []);

  const pipelineCode = `@dsl.pipeline(name='Simple DAG')
def my_pipeline():
    task_a = component_a()
    task_b = component_b(input=task_a.output)
    task_c = component_c()
    
    # Explicit ordering
    task_c.after(task_b)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p1 as string }} />

      <div className="flex flex-col gap-8 mb-12">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">{content.codeTitle}</h3>
            <CodeBlock code={pipelineCode} language="python" highlights={[5, 8]} />
        </div>
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">{content.visualTitle}</h3>
            <DagVisualizer />
        </div>
      </div>
    </motion.div>
  );
};
