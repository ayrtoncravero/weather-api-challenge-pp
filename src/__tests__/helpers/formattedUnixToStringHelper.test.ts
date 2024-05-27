import { formattedUnixToStringHelper } from '../../helpers/formattedUnixToDate.helper';

describe('formattedUnixToStringHelper', () => {
    it('should format Unix timestamp correctly', () => {
        const timestamp = 1621245000;
        expect(formattedUnixToStringHelper(timestamp)).toBe('2021-05-17-06:50:00');
    });

    it('should format Unix timestamp correctly for midnight', () => {
        const timestamp = 1621285200;
        expect(formattedUnixToStringHelper(timestamp)).toBe('2021-05-17-18:00:00');
    });

    it('should format Unix timestamp correctly for single-digit hour, minute, and second', () => {
        const timestamp = 1621285200;
        expect(formattedUnixToStringHelper(timestamp)).toBe('2021-05-17-18:00:00');
    });
});