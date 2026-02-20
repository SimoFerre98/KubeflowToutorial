import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { Settings, History, AlertCircle } from 'lucide-react';

export const ChapterAdvanced: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const t = useTranslation();
  const content = t.chapterContent.advanced;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    markChapterCompleted('advanced');
    return () => clearInterval(interval);
  }, []);

  const paramsCode = `@dsl.pipeline(name='Parametrized Pipeline')
def my_pipeline(
    learning_rate: float = 0.01,
    epochs: int = 10,
    model_uri: str = "gs://my-bucket/model.pt"
):
    # These values can be overridden in the UI at runtime!
    train_task = train_model(
        lr=learning_rate, 
        epochs=epochs
    )`;

  const cachingCode = `@dsl.pipeline(name='No Cache Pipeline')
def my_pipeline():
    # Force this task to run every time
    download_task = download_data()
    download_task.set_caching_options(False)
    
    # This task will still use caching (default)
    train_task = train_model(dataset=download_task.output)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
      <p className="text-xl text-slate-300 mb-12 leading-relaxed">
        {content.p1}
      </p>

      {/* Parameters Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-900/30 rounded-xl border border-purple-500/30">
                <Settings className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{content.paramsTitle}</h2>
        </div>
        
        <p className="text-slate-300 mb-6 leading-relaxed border-l-4 border-purple-500 pl-4">
            {content.paramsDesc}
        </p>

        <CodeBlock code={paramsCode} language="python" filename="pipeline_parameters.py" highlights={[3, 4, 5, 8, 9]} />
      </div>

      {/* Caching Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-900/30 rounded-xl border border-orange-500/30">
                <History className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{content.cachingTitle}</h2>
        </div>
        
        <p className="text-slate-300 mb-6 leading-relaxed border-l-4 border-orange-500 pl-4">
            {content.cachingDesc}
        </p>

        <CodeBlock code={cachingCode} language="python" filename="disable_caching.py" highlights={[5]} />

        <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div className="text-sm text-slate-300">
                <strong className="text-white block mb-1">Pro Tip:</strong>
                Use <code>set_caching_options(False)</code> for tasks that fetch data from external sources (APIs, databases, current time) where the input arguments don't change but the result might.
            </div>
        </div>
      </div>

    </motion.div>
  );
};