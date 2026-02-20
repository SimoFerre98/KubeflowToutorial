import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { SplitScreen } from '../../components/SplitScreen';
import { AlertTriangle } from 'lucide-react';

export const ChapterComponents: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const t = useTranslation();
  const content = t.chapterContent.components;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    markChapterCompleted('components');
    return () => clearInterval(interval);
  }, []);

  const functionCode = `def load_data(url: str) -> str:
    import pandas as pd
    df = pd.read_csv(url)
    return df.to_json()`;

  const componentCode = `@dsl.component(
    base_image='python:3.9',
    packages_to_install=['pandas']
)
def load_data(url: str) -> str:
    import pandas as pd
    df = pd.read_csv(url)
    return df.to_json()`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p1 as string }} />

      <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-4 mb-8 flex gap-4 items-start">
        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
        <p className="text-amber-200 text-sm md:text-base">{content.warning}</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-semibold text-white mb-4">{content.transformationTitle}</h3>
        <ul className="space-y-3 text-slate-300">
            <li className="flex gap-3 items-start">
                <span className="bg-blue-500/20 text-blue-400 font-mono px-2 rounded">1</span>
                <span dangerouslySetInnerHTML={{ __html: content.step1 as string }} />
            </li>
            <li className="flex gap-3 items-start">
                <span className="bg-blue-500/20 text-blue-400 font-mono px-2 rounded">2</span>
                <span dangerouslySetInnerHTML={{ __html: content.step2 as string }} />
            </li>
            <li className="flex gap-3 items-start">
                <span className="bg-blue-500/20 text-blue-400 font-mono px-2 rounded">3</span>
                <span dangerouslySetInnerHTML={{ __html: content.step3 as string }} />
            </li>
        </ul>
      </div>

      <SplitScreen
        leftTitle={content.leftTitle}
        rightTitle={content.rightTitle}
        leftContent={<CodeBlock code={functionCode} language="python" />}
        rightContent={<CodeBlock code={componentCode} language="python" highlights={[1, 2, 3]} />}
      />
    </motion.div>
  );
};
