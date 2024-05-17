import { COUNTRY_CODE } from '../constants/countryCodes';

export const isValidCountryCode = (countryCode: any) => {
    return COUNTRY_CODE.includes(countryCode);
};
