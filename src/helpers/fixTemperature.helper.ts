export const fixTemperatureHelper = (temperature: number): number => {
    const temp = temperature - 273.15;

    return parseFloat(temp.toFixed(2));
};
