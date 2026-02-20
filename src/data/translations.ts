import { Language } from '../types';

interface TranslationStructure {
  sidebar: {
    title: string;
    subtitle: string;
    viewProgress: string;
    cheatsheet: string;
  };
  chapters: {
    [key: string]: {
      title: string;
      description: string;
    }
  };
  common: {
    next: string;
    previous: string;
    complete: string;
    loading: string;
    copy: string;
    copied: string;
    quiz: string;
    submit: string;
    correct: string;
    incorrect: string;
    tryAgain: string;
  };
  cheatsheet: {
    title: string;
    component: string;
    pipeline: string;
    compile: string;
  };
  dag: {
    noDag: string;
    loadExample: string;
    title: string;
    subtitle: string;
    status: string;
    nodes: {
      load: string;
      preprocess: string;
      trainA: string;
      trainB: string;
      evaluate: string;
    }
  };
  chapterContent: {
    components: {
      title: string;
      p1: any; // Using any for React nodes
      transformationTitle: string;
      step1: any;
      step2: any;
      step3: any;
      leftTitle: string;
      rightTitle: string;
      warning: string;
    };
    pipeline: {
      title: string;
      p1: any;
      visualTitle: string;
      codeTitle: string;
    };
    helloworld: {
      title: string;
      p1: any;
      compileBtn: string;
      compiledBtn: string;
      yamlLabel: string;
    };
    artifacts: {
      title: string;
      p1: any;
      diagramTitle: string;
    };
    underthehood: {
      title: string;
      p1: any;
      troubleshootingTitle: string;
      error1Title: string;
      error1Text: string;
      error2Title: string;
      error2Text: string;
    };
    complete: {
      title: string;
      p1: any;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      finalNote: string;
    };
    advanced: {
      title: string;
      p1: string;
      paramsTitle: string;
      paramsDesc: string;
      cachingTitle: string;
      cachingDesc: string;
    };
  }
}

export const translations: Record<Language, TranslationStructure> = {
  en: {
    sidebar: {
      title: 'KFP Tutorial',
      subtitle: 'Master Kubeflow Pipelines SDK v2',
      viewProgress: 'View Progress Dashboard',
      cheatsheet: 'Cheat Sheet',
    },
    chapters: {
      components: { title: '1. Basics: The Component', description: 'Transform Python functions into Kubeflow components.' },
      pipeline: { title: '2. The Pipeline (Graph)', description: 'Connect components into a Directed Acyclic Graph.' },
      helloworld: { title: '3. Hello World & YAML', description: 'Build and compile a full pipeline to YAML.' },
      artifacts: { title: '4. Artifact Passing', description: 'Pass datasets and models between components.' },
      underthehood: { title: '5. Under the Hood', description: 'Pods, Logs, and Kubernetes troubleshooting.' },
      complete: { title: '6. Real World Example', description: 'A complete Iris Classification pipeline from scratch.' },
      advanced: { title: '7. Advanced Features', description: 'Master Pipeline Parameters and Caching strategies.' },
    },
    common: {
      next: 'Next',
      previous: 'Previous',
      complete: 'Complete',
      loading: 'Loading...',
      copy: 'Copy',
      copied: 'Copied!',
      quiz: 'Knowledge Check',
      submit: 'Submit Answer',
      correct: 'Correct!',
      incorrect: 'Incorrect, try again.',
      tryAgain: 'Try Again',
    },
    cheatsheet: {
      title: 'KFP Cheat Sheet',
      component: 'Define Component',
      pipeline: 'Define Pipeline',
      compile: 'Compile Pipeline',
    },
    dag: {
      noDag: 'No DAG loaded.',
      loadExample: 'Click below to load an example ML Pipeline DAG.',
      title: 'Example ML Pipeline DAG',
      subtitle: 'Visual representation of component dependencies',
      status: 'DAG_STATUS',
      nodes: {
        load: 'Load Data',
        preprocess: 'Preprocess',
        trainA: 'Train Model A',
        trainB: 'Train Model B',
        evaluate: 'Evaluate & Compare'
      }
    },
    chapterContent: {
      components: {
        title: '1. The Component',
        p1: 'A <strong>Component</strong> is the fundamental building block of a Kubeflow pipeline. Think of it as a containerized Python function.',
        transformationTitle: 'Transformation Recipe',
        step1: 'Add the <code>@dsl.component</code> decorator',
        step2: 'Define the <code>base_image</code> (e.g., python:3.9)',
        step3: 'Use Type Hints for inputs and outputs',
        leftTitle: 'Standard Python Function',
        rightTitle: 'Kubeflow Component',
        warning: 'Important: Notebooks should only be used to define and compile the pipeline. Do NOT run heavy training directly in notebook cells. All training logic must be encapsulated within Components.'
      },
      pipeline: {
        title: '2. The Pipeline (Graph)',
        p1: 'The <code>@dsl.pipeline</code> decorator connects your components into a <strong>Directed Acyclic Graph (DAG)</strong>. Execution order is determined by data dependencies or explicit ordering.',
        visualTitle: 'Interactive DAG',
        codeTitle: 'Pipeline Code'
      },
      helloworld: {
        title: '3. Hello World & YAML',
        p1: 'Kubeflow Pipelines runs on Kubernetes, which doesn\'t understand Python directly. We must <strong>compile</strong> our Python pipeline into a YAML workflow specification.',
        compileBtn: 'Compile to YAML',
        compiledBtn: 'Compiled Successfully',
        yamlLabel: 'GENERATED ARGO WORKFLOW YAML'
      },
      artifacts: {
        title: '4. Artifact Passing',
        p1: 'For large data like Datasets or Models, we don\'t pass values directly. Instead, KFP handles file storage (e.g., MinIO/S3) automatically using <strong>Artifacts</strong>.',
        diagramTitle: 'Using Input[Artifact] & Output[Artifact]'
      },
      underthehood: {
        title: '5. Under the Hood',
        p1: 'When you run a pipeline, KFP orchestrates Kubernetes resources. Each component becomes a <strong>Pod</strong> running your specified container.',
        troubleshootingTitle: 'Common Issues (Troubleshooting)',
        error1Title: 'ImagePullBackOff',
        error1Text: 'Kubernetes cannot pull your container image. Check if the image name is correct or if you need authentication.',
        error2Title: 'OOMKilled',
        error2Text: 'Out Of Memory. Your component used more RAM than allocated. Increase resource limits.'
      },
      complete: {
        title: '6. Real World Example: Iris Classification',
        p1: 'Let\'s put it all together. We will build a pipeline that loads the Iris dataset, trains a Decision Tree classifier, and evaluates its accuracy.',
        step1Title: 'Step 1: Define Components',
        step1Desc: 'We create three components: one to load data, one to train the model, and one to evaluate it. Notice how we use Input[Dataset] and Output[Model].',
        step2Title: 'Step 2: Define Pipeline',
        step2Desc: 'We connect the components. The output of `load_data` becomes the input for `train_model`, and so on.',
        step3Title: 'Step 3: Compile',
        step3Desc: 'Finally, we compile the pipeline to a YAML file ready for Kubeflow.',
        finalNote: 'This YAML file is what you upload to the Kubeflow UI to run the experiment!'
      },
      advanced: {
        title: '7. Advanced Features',
        p1: 'Take your pipelines to the next level by mastering runtime parameters and intelligent caching.',
        paramsTitle: 'Pipeline Parameters',
        paramsDesc: 'Instead of hardcoding values, pass arguments to your pipeline function. This allows you to reuse the same pipeline for different experiments (e.g., changing learning rate or model URI).',
        cachingTitle: 'Caching Strategy',
        cachingDesc: 'KFP caches successful task executions by default to save time and resources. However, for tasks that fetch external data (like downloading from a URL), you should DISABLE caching to ensure fresh data is always retrieved.'
      }
    }
  },
  it: {
    sidebar: {
      title: 'Tutorial KFP',
      subtitle: 'Impara Kubeflow Pipelines SDK v2',
      viewProgress: 'Visualizza Dashboard Progressi',
      cheatsheet: 'Cheat Sheet',
    },
    chapters: {
      components: { title: '1. Basi: Il Componente', description: 'Trasforma funzioni Python in componenti Kubeflow.' },
      pipeline: { title: '2. La Pipeline (Il Grafo)', description: 'Collega i componenti in un Grafo Aciclico Diretto.' },
      helloworld: { title: '3. Hello World & YAML', description: 'Costruisci e compila una pipeline completa in YAML.' },
      artifacts: { title: '4. Passaggio di Artefatti', description: 'Passa dataset e modelli tra i componenti.' },
      underthehood: { title: '5. Sotto il cofano', description: 'Pod, Log e troubleshooting su Kubernetes.' },
      complete: { title: '6. Esempio Reale', description: 'Una pipeline completa di classificazione Iris da zero.' },
      advanced: { title: '7. Funzionalità Avanzate', description: 'Padroneggia i Parametri e il Caching.' },
    },
    common: {
      next: 'Avanti',
      previous: 'Indietro',
      complete: 'Completo',
      loading: 'Caricamento...',
      copy: 'Copia',
      copied: 'Copiato!',
      quiz: 'Verifica delle Conoscenze',
      submit: 'Invia Risposta',
      correct: 'Corretto!',
      incorrect: 'Sbagliato, riprova.',
      tryAgain: 'Riprova',
    },
    cheatsheet: {
      title: 'KFP Cheat Sheet',
      component: 'Definisci Componente',
      pipeline: 'Definisci Pipeline',
      compile: 'Compila Pipeline',
    },
    dag: {
      noDag: 'Nessun DAG caricato.',
      loadExample: 'Clicca qui sotto per caricare un esempio di DAG Pipeline ML.',
      title: 'Esempio DAG Pipeline ML',
      subtitle: 'Rappresentazione visiva delle dipendenze dei componenti',
      status: 'STATO_DAG',
      nodes: {
        load: 'Carica Dati',
        preprocess: 'Pre-elaborazione',
        trainA: 'Allena Modello A',
        trainB: 'Allena Modello B',
        evaluate: 'Valuta e Confronta'
      }
    },
    chapterContent: {
      components: {
        title: '1. Il Componente',
        p1: 'Un <strong>Componente</strong> è il blocco fondamentale di una pipeline Kubeflow. Immaginalo come una funzione Python containerizzata.',
        transformationTitle: 'Ricetta di Trasformazione',
        step1: 'Aggiungi il decoratore <code>@dsl.component</code>',
        step2: 'Definisci la <code>base_image</code> (es. python:3.9)',
        step3: 'Usa i Type Hints per input e output',
        leftTitle: 'Funzione Python Standard',
        rightTitle: 'Componente Kubeflow',
        warning: 'Importante: I notebook devono essere usati solo per definire e compilare la pipeline. NON eseguire training pesanti direttamente nelle celle del notebook. Tutta la logica di training deve essere incapsulata all\'interno dei Componenti.'
      },
      pipeline: {
        title: '2. La Pipeline (Il Grafo)',
        p1: 'Il decoratore <code>@dsl.pipeline</code> collega i tuoi componenti in un <strong>Grafo Aciclico Diretto (DAG)</strong>. L\'ordine di esecuzione è determinato dalle dipendenze dei dati o dall\'ordinamento esplicito.',
        visualTitle: 'DAG Interattivo',
        codeTitle: 'Codice Pipeline'
      },
      helloworld: {
        title: '3. Hello World & YAML',
        p1: 'Kubeflow Pipelines gira su Kubernetes, che non capisce direttamente Python. Dobbiamo <strong>compilare</strong> la nostra pipeline Python in una specifica workflow YAML.',
        compileBtn: 'Compila in YAML',
        compiledBtn: 'Compilato con Successo',
        yamlLabel: 'YAML ARGO WORKFLOW GENERATO'
      },
      artifacts: {
        title: '4. Passaggio di Artefatti',
        p1: 'Per dati grandi come Dataset o Modelli, non passiamo i valori direttamente. Invece, KFP gestisce automaticamente lo storage dei file (es. MinIO/S3) usando gli <strong>Artefatti</strong>.',
        diagramTitle: 'Usare Input[Artifact] & Output[Artifact]'
      },
      underthehood: {
        title: '5. Sotto il cofano',
        p1: 'Quando esegui una pipeline, KFP orchestra le risorse Kubernetes. Ogni componente diventa un <strong>Pod</strong> che esegue il container specificato.',
        troubleshootingTitle: 'Problemi Comuni (Troubleshooting)',
        error1Title: 'ImagePullBackOff',
        error1Text: 'Kubernetes non riesce a scaricare l\'immagine del container. Controlla se il nome dell\'immagine è corretto o se serve autenticazione.',
        error2Title: 'OOMKilled',
        error2Text: 'Out Of Memory. Il componente ha usato più RAM di quella allocata. Aumenta i limiti delle risorse.'
      },
      complete: {
        title: '6. Esempio Reale: Classificazione Iris',
        p1: 'Mettiamo tutto insieme. Costruiremo una pipeline che carica il dataset Iris, allena un classificatore Decision Tree e ne valuta l\'accuratezza.',
        step1Title: 'Step 1: Definisci Componenti',
        step1Desc: 'Creiamo tre componenti: uno per caricare i dati, uno per allenare il modello e uno per valutarlo. Nota come usiamo Input[Dataset] e Output[Model].',
        step2Title: 'Step 2: Definisci Pipeline',
        step2Desc: 'Colleghiamo i componenti. L\'output di `load_data` diventa l\'input di `train_model`, e così via.',
        step3Title: 'Step 3: Compila',
        step3Desc: 'Infine, compiliamo la pipeline in un file YAML pronto per Kubeflow.',
        finalNote: 'Questo file YAML è ciò che carichi sulla UI di Kubeflow per eseguire l\'esperimento!'
      },
      advanced: {
        title: '7. Funzionalità Avanzate',
        p1: 'Porta le tue pipeline al livello successivo padroneggiando i parametri a runtime e il caching intelligente.',
        paramsTitle: 'Parametri della Pipeline',
        paramsDesc: 'Invece di scrivere valori fissi nel codice, passa argomenti alla funzione della pipeline. Questo ti permette di riusare la stessa pipeline per esperimenti diversi (es. cambiando learning rate o URI del modello).',
        cachingTitle: 'Strategia di Caching',
        cachingDesc: 'KFP salva in cache le esecuzioni completate con successo per risparmiare tempo e risorse. Tuttavia, per task che scaricano dati esterni (come da un URL), dovresti DISABILITARE il caching per garantire di avere sempre dati freschi.'
      }
    }
  },
};
