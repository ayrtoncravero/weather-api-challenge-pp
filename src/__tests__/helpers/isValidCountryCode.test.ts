import { isValidCountryCode } from '../../helpers/isValidCountryCode.helper';

describe('isValidCountryCode', () => {
    it('should return false for invalid country codes', () => {
        const invalidCountryCodes = ['XX', '123', 'ABC'];
        invalidCountryCodes.forEach((countryCode) => {
            expect(isValidCountryCode(countryCode)).toBe(false);
        });
    });

    it('should return false for undefined or null input', () => {
        expect(isValidCountryCode(undefined)).toBe(false);
        expect(isValidCountryCode(null)).toBe(false);
    });
});