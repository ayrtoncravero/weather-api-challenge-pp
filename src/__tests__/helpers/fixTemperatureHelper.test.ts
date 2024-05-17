import { fixTemperatureHelper } from '../../helpers/fixTemperature.helper';

describe('fixTemperatureHelper', () => {
    it('should return fixed temperature with two decimal places', () => {
        expect(fixTemperatureHelper(273.15)).toBe(0.00);
        expect(fixTemperatureHelper(300)).toBe(26.85);
        expect(fixTemperatureHelper(250)).toBe(-23.15);
    });

    it('should handle negative temperatures properly', () => {
        expect(fixTemperatureHelper(-10)).toBe(-283.15);
        expect(fixTemperatureHelper(-20.5)).toBe(-293.65);
    });
});