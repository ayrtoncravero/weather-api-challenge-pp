import { ENABLES_LANGUAGES } from '../constants/enablesLanguages';

export const isValidLanguage = (language?: string | null) => {
    if (language === null || language === undefined) {
        return false;
    }

    return ENABLES_LANGUAGES.includes(language);
};
