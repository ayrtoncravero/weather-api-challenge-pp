import { replaceSpacesWithEncoded } from '../../helpers/replaceSpacesWithEncoded.helper';

describe('replaceSpacesWithEncoded', () => {
    it('replaces spaces with encoded spaces', () => {
        const input = 'san francisco';
        const expectedOutput = 'san%20francisco';

        expect(replaceSpacesWithEncoded(input)).toBe(expectedOutput);
    });

    it('returns an empty string when input is undefined', () => {
        expect(replaceSpacesWithEncoded(undefined)).toBe('');
    });

    it('returns an empty string when input is an empty string', () => {
        expect(replaceSpacesWithEncoded('')).toBe('');
    });

    it('does not modify string without spaces', () => {
        const input = 'cordoba';
        expect(replaceSpacesWithEncoded(input)).toBe(input);
    });
});