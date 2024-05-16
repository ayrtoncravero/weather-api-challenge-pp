import { ENABLES_LANGUAGES } from '../constants/enablesLanguages';

export const isValidLanguage = (language: string) => {
    return ENABLES_LANGUAGES.includes(language);
};
