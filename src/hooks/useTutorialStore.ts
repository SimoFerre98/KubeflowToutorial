import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TutorialState } from '../types';

interface TutorialStore extends TutorialState {}

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set) => ({
      completedChapters: [],
      quizResults: {},
      lastAccessedChapter: 'basics',
      totalTimeSpent: 0,
      currentChapter: 'basics',
      language: 'en',

      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId, lastAccessedChapter: chapterId }),
      setLanguage: (lang) => set({ language: lang }),
      
      markChapterCompleted: (chapterId) =>
        set((state) => {
          if (state.completedChapters.includes(chapterId)) return state;
          return { completedChapters: [...state.completedChapters, chapterId] };
        }),

      submitQuiz: (quizId, success) =>
        set((state) => ({
          quizResults: { ...state.quizResults, [quizId]: success },
        })),

      updateTimeSpent: (time) =>
        set((state) => ({ totalTimeSpent: state.totalTimeSpent + time })),

      resetProgress: () =>
        set({
          completedChapters: [],
          quizResults: {},
          lastAccessedChapter: 'basics',
          totalTimeSpent: 0,
          currentChapter: 'basics',
          language: 'en',
        }),
    }),
    {
      name: 'kubeflow-tutorial-storage',
      partialize: (state) => ({
        completedChapters: state.completedChapters,
        quizResults: state.quizResults,
        lastAccessedChapter: state.lastAccessedChapter,
        totalTimeSpent: state.totalTimeSpent,
        language: state.language,
      }),
    }
  )
);
