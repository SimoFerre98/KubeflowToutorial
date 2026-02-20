export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  hasQuiz: boolean;
  estimatedTime: number; // in minutes
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'python' | 'yaml';
  highlights?: number[]; // line numbers to highlight
  filename?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation?: string;
}

export interface SplitScreenContent {
  leftTitle: string;
  rightTitle: string;
  leftContent: CodeExample | string;
  rightContent: CodeExample | string;
}

export interface TutorialSection {
  id: string;
  type: 'text' | 'code' | 'image' | 'split-screen' | 'quiz';
  content: string | CodeExample | SplitScreenContent | QuizQuestion;
  title?: string;
}

export interface ChapterContent {
  id: string;
  title: string;
  sections: TutorialSection[];
  nextChapter?: string;
  previousChapter?: string;
}

export type Language = 'en' | 'it';

export interface UserProgress {
  completedChapters: string[];
  quizResults: Record<string, boolean>; // quizId -> passed
  lastAccessedChapter: string;
  totalTimeSpent: number; // milliseconds
  language: Language;
}

export interface TutorialState extends UserProgress {
  currentChapter: string;
  setCurrentChapter: (chapterId: string) => void;
  markChapterCompleted: (chapterId: string) => void;
  submitQuiz: (quizId: string, success: boolean) => void;
  updateTimeSpent: (time: number) => void;
  resetProgress: () => void;
  setLanguage: (lang: Language) => void;
}
