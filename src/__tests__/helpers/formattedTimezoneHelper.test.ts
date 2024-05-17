import { formattedTimezoneHelper } from '../../helpers/formattedTimezone.helper';

describe('formattedTimezoneHelper', () => {
    it('should format positive timezone offset correctly', () => {
        expect(formattedTimezoneHelper(3600)).toBe('+01:00');
        expect(formattedTimezoneHelper(7200)).toBe('+02:00');
    });

    it('should format negative timezone offset correctly', () => {
        expect(formattedTimezoneHelper(-3600)).toBe('-01:00');
        expect(formattedTimezoneHelper(-7200)).toBe('-02:00');
    });

    it('should format zero timezone offset correctly', () => {
        expect(formattedTimezoneHelper(0)).toBe('+00:00');
    });
});