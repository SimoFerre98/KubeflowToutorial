import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { ArrowDown, FileCode, CheckCircle } from 'lucide-react';

export const ChapterHelloWorld: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const [compiled, setCompiled] = useState(false);
  const t = useTranslation();
  const content = t.chapterContent.helloworld;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCompile = () => {
    setCompiled(true);
    markChapterCompleted('helloworld');
  };

  const pythonCode = `from kfp import dsl
from kfp import compiler

@dsl.component
def say_hello(name: str) -> str:
    return f'Hello {name}!'

@dsl.pipeline(name='Hello Pipeline')
def hello_pipeline(recipient: str):
    say_hello(name=recipient)

# Compile to YAML
compiler.Compiler().compile(
    pipeline_func=hello_pipeline,
    package_path='pipeline.yaml'
)`;

  const yamlCode = `apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: hello-pipeline-
spec:
  arguments:
    parameters:
    - name: recipient
  templates:
  - name: say-hello
    container:
      image: python:3.7
      command: [python, -c, ...]
  entrypoint: hello-pipeline`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p1 as string }} />

      <div className="mb-8">
        <CodeBlock code={pythonCode} language="python" highlights={[13, 14, 15, 16]} />
      </div>

      <div className="flex justify-center my-12">
        <button
            onClick={handleCompile}
            disabled={compiled}
            className={`
                px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 transition-all transform
                ${compiled 
                    ? 'bg-green-500/20 text-green-400 cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1'
                }
            `}
        >
            {compiled ? (
                <>
                    <CheckCircle className="w-6 h-6" />
                    {content.compiledBtn}
                </>
            ) : (
                <>
                    <FileCode className="w-6 h-6" />
                    {content.compileBtn}
                </>
            )}
        </button>
      </div>

      <AnimatePresence>
        {compiled && (
            <motion.div
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="overflow-hidden"
            >
                <div className="flex flex-col items-center mb-6 text-slate-500">
                    <ArrowDown className="w-8 h-8 animate-bounce" />
                    <span className="text-sm font-mono mt-2">{content.yamlLabel}</span>
                </div>
                
                <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <CodeBlock code={yamlCode} language="yaml" />
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
