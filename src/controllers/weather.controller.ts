import {
    Request,
    Response,
} from 'express';
import axios, { AxiosResponse } from 'axios';
import {
    formaterWeaterObjetWithParameters,
    formaterCityObjetWithParameters,
    getIpApiCurrentDefault,
    getTemperatureSymbol,
    getWeatherData,
    getWeatherForecast5Days,
    getForecastWeatherData,
} from '../services/weather.service';
import { isValidCountryCode } from '../helpers/isValidCountryCode.hekper';
import { formattedTimezoneHelper } from '../helpers/formattedTimezone.helper';
import { isValidLanguage } from '../helpers/isValidLanguage.helper';
const apiKey: string | undefined = process.env.API_KEY;

export const location = async (_req: Request, res: Response) => {
    try {
        const url: string = `${process.env.URL_BASE_IP_API}/json`;

        const { data }: AxiosResponse<any> = await axios.get(url);

        const cityData: object = {
            city: data.city,
            country: data.countryCode,
            coord: {
                lat: data.lat,
                lon: data.lon,
            },
        };

        return res.status(200).json(cityData);
    } catch(error: any) {
        console.log('error: ', error.message);
        return res.status(500).json({
            message: 'something goes wrong',
        });
    }
};

export const currentCity = async (req: Request, res: Response) => {
    const city: string = req.params.city;
    let country: string | undefined = req.query.country?.toString().toUpperCase();
    let lang: string | undefined = req.query.lang?.toString() ?? 'es';
    const unit: string | undefined = req.query.unit?.toString() ?? 'metric';

    const temperatureSymbol: string | undefined = getTemperatureSymbol(unit);

    const baseUrlOpenWeatherApi: string | undefined = process.env.URL_BASE_OPEN_WEATHER_API;

    if(!isValidLanguage(lang)) {
        lang = 'es';
    }

    if(!city) {
        const urlIpApi: string =`${process.env.URL_BASE_IP_API}/json`;
        const responseGetIpApiCurrentDefault = await getIpApiCurrentDefault(urlIpApi);

        const city: string = responseGetIpApiCurrentDefault.city;
        const countryCode: string = responseGetIpApiCurrentDefault.countryCode;
        const timezone: string = responseGetIpApiCurrentDefault.timezone;

        const weatherPath: string = 'weather';
        const responseGetWeatherData: object = await getWeatherData(
            baseUrlOpenWeatherApi,
            weatherPath,
            city,
            countryCode,
            apiKey,
            unit,
            lang,
        );

        const currentWeather: object = formaterWeaterObjetWithParameters(
            responseGetWeatherData,
            timezone,
            temperatureSymbol,
        );

       const cityData: object = formaterCityObjetWithParameters(responseGetWeatherData); 

        return res.status(200).json({
            cityData,
            currentWeather,
        });
    }

    try {
        const urlIpApi: string =`${process.env.URL_BASE_IP_API}/json`;
        const responseGetIpApiCurrentDefault = await getIpApiCurrentDefault(urlIpApi);
        const timezone: string = responseGetIpApiCurrentDefault.timezone;

        if(!country) {
            country = responseGetIpApiCurrentDefault.data?.countryCode || responseGetIpApiCurrentDefault.countryCode;
        }

        const weatherPath: string = 'weather';
        const responseGetWeatherData: object | any = await getWeatherData(
            baseUrlOpenWeatherApi,
            weatherPath,
            city,
            country,
            apiKey,
            unit,
            lang,
        );

        const currentWeatherForecast: object = formaterWeaterObjetWithParameters(
            responseGetWeatherData,
            timezone,
            temperatureSymbol,
        );

        const cityData: object = formaterCityObjetWithParameters(responseGetWeatherData);

        return res.status(200).json({
            cityData,
            currentWeatherForecast,
        });
    } catch(error: any) {
        console.log(error.message);
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};

export const forecastCity = async (req: Request, res: Response) => {
    const city: string = req.params.city;
    let country: string | undefined = req.query.country?.toString().toUpperCase();
    let lang: string | undefined = req.query.lang?.toString() ?? 'es';
    const unit: string = req.query.unit?.toString() ?? 'metric';

    const temperatureSymbol: string | undefined = getTemperatureSymbol(unit);

    const baseUrlOpenWeatherApi: string | undefined = process.env.URL_BASE_OPEN_WEATHER_API;

    if(!isValidLanguage(lang)) {
        lang = 'es';
    }
    
    if(!city) {
        try {
            const urlIpApi: string =`${process.env.URL_BASE_IP_API}/json`;
            const responseGetIpApiCurrentDefault = await getIpApiCurrentDefault(urlIpApi);

            const city: string = responseGetIpApiCurrentDefault.city;
            const countryCode: string = responseGetIpApiCurrentDefault.countryCode;

            const forecastWeatherPath: string = 'forecast';
            const responseForestWeatherData: any = await getWeatherData(
                baseUrlOpenWeatherApi,
                forecastWeatherPath,
                city,
                countryCode,
                apiKey,
                unit,
                lang,
            );

            const weatherForecast5Days: Array<object> = getWeatherForecast5Days(responseForestWeatherData, temperatureSymbol);

            const cityData: object = formaterCityObjetWithParameters(responseForestWeatherData.city);
    
            return res.status(200).json({
                cityData,
                weatherForecast5Days,
            });
        } catch(error: any) {
            console.log(error.message);
            return res.status(500).json({
                message: 'something goes wrong'
            });
        }
    }

    try {
        const urlIpApi: string =`${process.env.URL_BASE_IP_API}/json`;
        const responseGetIpApiCurrentDefault: any = await getIpApiCurrentDefault(urlIpApi);
        let timezone: string = responseGetIpApiCurrentDefault.timezone;

        if(!country) {
            country = responseGetIpApiCurrentDefault.data?.countryCode || responseGetIpApiCurrentDefault.countryCode;
        }

        if(!isValidCountryCode(country)) {
            country = responseGetIpApiCurrentDefault.data?.countryCode || responseGetIpApiCurrentDefault.countryCode;
        }

        const weatherPath: string = 'forecast';
        const responseGetWeatherData: object | any = await getForecastWeatherData(
            baseUrlOpenWeatherApi,
            weatherPath,
            city,
            apiKey,
            lang,
            unit,
            country,
        );

        if(city) {
            timezone = formattedTimezoneHelper(responseGetWeatherData.city.timezone);
        }

        const currentWeatherForecast: object = formaterWeaterObjetWithParameters(
            responseGetWeatherData,
            timezone,
            temperatureSymbol,
        );

        const cityData: object = formaterCityObjetWithParameters(responseGetWeatherData.city);

        return res.status(200).json({
            cityData,
            currentWeatherForecast,
        });
    } catch(error: any) {
        console.log(error.message);
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};