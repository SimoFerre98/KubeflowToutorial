import { useTutorialStore } from './useTutorialStore';
import { translations } from '../data/translations';

export const useTranslation = () => {
  const { language } = useTutorialStore();
  return translations[language];
};
