import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTutorialStore } from '../../hooks/useTutorialStore';
import { useTranslation } from '../../hooks/useTranslation';
import { CodeBlock } from '../../components/CodeBlock';
import { ArrowDown, Database, Brain, BarChart } from 'lucide-react';

export const ChapterCompleteExample: React.FC = () => {
  const { markChapterCompleted, updateTimeSpent } = useTutorialStore();
  const t = useTranslation();
  const content = t.chapterContent.complete;

  useEffect(() => {
    const interval = setInterval(() => updateTimeSpent(1000), 1000);
    markChapterCompleted('complete-example');
    return () => clearInterval(interval);
  }, []);

  const componentsCode = `from kfp import dsl
from kfp.dsl import Input, Output, Dataset, Model, Metrics

@dsl.component(base_image='python:3.9', packages_to_install=['pandas', 'scikit-learn'])
def load_data(dataset: Output[Dataset]):
    from sklearn import datasets
    import pandas as pd
    
    iris = datasets.load_iris()
    df = pd.DataFrame(iris.data, columns=iris.feature_names)
    df['target'] = iris.target
    df.to_csv(dataset.path, index=False)

@dsl.component(base_image='python:3.9', packages_to_install=['pandas', 'scikit-learn'])
def train_model(
    dataset: Input[Dataset],
    model: Output[Model]
):
    import pandas as pd
    from sklearn.tree import DecisionTreeClassifier
    import joblib
    
    df = pd.read_csv(dataset.path)
    X = df.drop('target', axis=1)
    y = df['target']
    
    clf = DecisionTreeClassifier()
    clf.fit(X, y)
    
    # Save model artifact
    joblib.dump(clf, model.path)

@dsl.component(base_image='python:3.9', packages_to_install=['pandas', 'scikit-learn'])
def evaluate_model(
    dataset: Input[Dataset],
    model: Input[Model],
    metrics: Output[Metrics]
):
    import pandas as pd
    import joblib
    from sklearn.metrics import accuracy_score
    
    df = pd.read_csv(dataset.path)
    clf = joblib.load(model.path)
    
    X = df.drop('target', axis=1)
    y = df['target']
    
    predictions = clf.predict(X)
    acc = accuracy_score(y, predictions)
    
    # Log metrics to Kubeflow UI
    metrics.log_metric("accuracy", acc)`;

  const pipelineCode = `@dsl.pipeline(name='Iris Classification Pipeline')
def iris_pipeline():
    # Step 1: Load Data
    load_task = load_data()
    
    # Step 2: Train (depends on load_task)
    train_task = train_model(
        dataset=load_task.outputs['dataset']
    )
    
    # Step 3: Evaluate (depends on train_task and load_task)
    evaluate_task = evaluate_model(
        dataset=load_task.outputs['dataset'],
        model=train_task.outputs['model']
    )`;

  const compileCode = `from kfp import compiler

compiler.Compiler().compile(
    pipeline_func=iris_pipeline,
    package_path='iris_pipeline.yaml'
)`;

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

      {/* Visual Flow */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 hidden md:block"></div>
         
         <div className="flex flex-col items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-700 z-10 w-40">
            <Database className="w-8 h-8 text-blue-400" />
            <span className="text-sm font-bold text-white">Load Data</span>
         </div>
         
         <ArrowDown className="w-6 h-6 text-slate-600 md:rotate-270 md:w-8 md:h-8" />
         
         <div className="flex flex-col items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-700 z-10 w-40">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-sm font-bold text-white">Train Model</span>
         </div>
         
         <ArrowDown className="w-6 h-6 text-slate-600 md:rotate-270 md:w-8 md:h-8" />
         
         <div className="flex flex-col items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-700 z-10 w-40">
            <BarChart className="w-8 h-8 text-green-400" />
            <span className="text-sm font-bold text-white">Evaluate</span>
         </div>
      </div>

      {/* Step 1 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            {content.step1Title}
        </h2>
        <p className="text-slate-400 mb-4">{content.step1Desc}</p>
        <CodeBlock code={componentsCode} language="python" filename="components.py" />
      </div>

      {/* Step 2 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            {content.step2Title}
        </h2>
        <p className="text-slate-400 mb-4">{content.step2Desc}</p>
        <CodeBlock code={pipelineCode} language="python" filename="pipeline.py" />
      </div>

      {/* Step 3 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
            {content.step3Title}
        </h2>
        <p className="text-slate-400 mb-4">{content.step3Desc}</p>
        <CodeBlock code={compileCode} language="python" filename="compile_pipeline.py" />
        
        <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {content.finalNote}
        </div>
      </div>

    </motion.div>
  );
};
