import axios, { AxiosResponse } from 'axios';
import { TEMPERATURE_SYMBOL } from '../constants/temperatureSymbol';
import { TEMPERATURE_UNITS } from '../constants/temperatureUnits';

export const getTemperatureSymbol = (unit: string | undefined): string | undefined => {
    switch (unit) {
        case TEMPERATURE_UNITS.KELVIN:
            return TEMPERATURE_SYMBOL.KELVIN;
        case TEMPERATURE_UNITS.FAHRENHEIT:
            return TEMPERATURE_SYMBOL.FAHRENHEIT;
        case TEMPERATURE_UNITS.CELSIUS:
            return TEMPERATURE_SYMBOL.CELSIUS;
        default:
            return TEMPERATURE_SYMBOL.CELSIUS;
    }
};

export const getIpApiCurrentDefault = async (url: string): Promise<any> => {
    try {
        const { data }: AxiosResponse<any> = await axios.get(url);

        return data;
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};

export const getWeatherData = async (
    baseUrlOpenWeatherApi: string | undefined,
    weatherPath: string,
    city: string,
    countryCode: string | undefined,
    apiKey: string | undefined,
    unit: string | undefined,
    lang: string,
): Promise<any> => {
    try {
        const urlWeather = new URL(`${baseUrlOpenWeatherApi}/${weatherPath}`);

        urlWeather.searchParams.set('q', `${city},${countryCode}`);
        urlWeather.searchParams.set('appid', `${apiKey}`);
        urlWeather.searchParams.set('units', `${unit}`);
        urlWeather.searchParams.set('lang', `${lang}`);

        const response: AxiosResponse<any> = await axios.get(urlWeather.toString());

        return response.data;
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};

export const formaterWeaterObjetWithParameters = (
    weatherData: any,
    timezone: string,
    temperatureSymbol: string | undefined,
): any => {
    try {
        if(weatherData.list) {
            const weatherArray: Array<object> = [];
            weatherData.list.forEach((element: any) => {
                weatherArray.push(
                    {
                        description:element.list?.[0]?.weather?.[0]?.description ||element.weather?.[0]?.description || 'No description available',
                        timezone,
                        temperature: {
                            unit: temperatureSymbol || 'No temperature unit available',
                            value:element.list?.[0]?.main?.temp ||element.main?.temp || 0 || 'No temperature value available',
                        },
                        humidity: {
                            unit: '%',
                            value:element.list?.[0]?.main?.humidity ||element.main?.humidity || 0 || 'No humidity value available',
                        },
                        windSpeed: {
                            unit: 'M/S',
                            value:element.list?.[0]?.wind?.speed ||element.wind?.speed || 0 ,
                        },
                    },
                );
            });
    
            return weatherArray;
        }
    
        return {
            description: weatherData.list?.[0]?.weather?.[0]?.description || weatherData.weather?.[0]?.description || 'No description available',
            timezone,
            temperature: {
                unit: temperatureSymbol || 'No temperature unit available',
                value: weatherData.list?.[0]?.main?.temp || weatherData.main?.temp || 0 || 'No temperature value available',
            },
            humidity: {
                unit: '%',
                value: weatherData.list?.[0]?.main?.humidity || weatherData.main?.humidity || 0 || 'No humidity value available',
            },
            windSpeed: {
                unit: 'M/S',
                value: weatherData.list?.[0]?.wind?.speed || weatherData.wind?.speed || 0 ,
            },
        };
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};

export const formaterCityObjetWithParameters = (responseGetWeatherData: any): object => {
    try {
        return {
            city: responseGetWeatherData?.name || 'No city available',
            country: responseGetWeatherData?.country || responseGetWeatherData.sys.country || 'No coutry available',
            coord: {
                lat: responseGetWeatherData?.coord.lat || 'No lat available',
                lon: responseGetWeatherData?.coord.lon || 'No lon available',
            },
        };
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};

export const getForecastWeatherData = async (
    baseUrlOpenWeatherApi: string | undefined,
    forecastWeatherPath: string,
    city: string,
    apiKey: string | undefined,
    lang: string,
    unit: string | undefined,
    country: string | undefined,
) => {
    try {
        const urlForecastWeather = new URL(`${baseUrlOpenWeatherApi}/${forecastWeatherPath}`);

        urlForecastWeather.searchParams.set('q', `${city},${country}`);
        urlForecastWeather.searchParams.set('appid', `${apiKey}`);
        urlForecastWeather.searchParams.set('units', `${unit}`);
        urlForecastWeather.searchParams.set('lang', `${lang}`);

        const { data }: AxiosResponse<any> = await axios.get(urlForecastWeather.toString());

        return data;
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};

export const getWeatherForecast5Days = (forestWeatherData: any, temperatureSymbol: string | undefined): any => {
    const weatherForecast5Days: Array<object> = [];

    try {
        forestWeatherData.list.forEach((element: any) => {
            const dateTime = element.dt_txt;
            const temperature =  {
                unit: temperatureSymbol,
                value: element.main.temp,
            };
            const humidity = {
                unit: '%',
                value: element.main.humidity,
            };
            const weatherDescription = element.weather[0].description;
            const windSpeed = {
                unit: 'M/S',
                value: element.wind.speed,
            };
    
            weatherForecast5Days.push({
                dateTime,
                temperature,
                humidity,
                weatherDescription,
                windSpeed,
            });
        });
    
        return weatherForecast5Days;
    } catch(error: any) {
        console.log('error: ', error.message);
        throw error;
    }
};
