import { isValidLanguage } from '../../helpers/isValidLanguage.helper';

describe('isValidLanguage', () => {
    it('should return true for valid language', () => {
        const validLanguage = 'en';
        expect(isValidLanguage(validLanguage)).toBe(true);
    });

    it('should return false for invalid language', () => {
        const invalidLanguage = 'xx';
        expect(isValidLanguage(invalidLanguage)).toBe(false);
    });

    it('should return false for undefined language', () => {
        const undefinedLanguage = undefined;
        expect(isValidLanguage(undefinedLanguage)).toBe(false);
    });

    it('should return false for null language', () => {
        const nullLanguage = null;
        expect(isValidLanguage(nullLanguage)).toBe(false);
    });

    it('should return false for empty string language', () => {
        const emptyStringLanguage = '';
        expect(isValidLanguage(emptyStringLanguage)).toBe(false);
    });
});