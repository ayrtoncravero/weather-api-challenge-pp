import { 
    formaterWeaterObjetWithParameters,
    formaterCityObjetWithParameters,
    getWeatherForecast5Days,
} from '../../services/weather.service';


describe('formaterWeaterObjetWithParameters', () => {
  test('should correctly format weather data when there is a list of data', () => {
    const weatherData = {
      list: [
        {
          weather: [{ description: 'Sunny' }],
          main: { temp: 25, humidity: 50 },
          wind: { speed: 10 },
        },
      ],
    };
    const timezone = 'America/Argentina/Cordoba';
    const temperatureSymbol = '°C';
    const formattedWeather = formaterWeaterObjetWithParameters(weatherData, timezone, temperatureSymbol);

    expect(formattedWeather).toHaveLength(weatherData.list.length);
  });

  test('should correctly format weather data when there is no data list', () => {
    const weatherData = {
      weather: [{ description: 'Cloudy' }],
      main: { temp: 20, humidity: 60 },
      wind: { speed: 5 },
    };
    const timezone = 'Europe/Berlin';
    const temperatureSymbol = '°F';
    const formattedWeather = formaterWeaterObjetWithParameters(weatherData, timezone, temperatureSymbol);

    expect(Array.isArray(formattedWeather)).toBe(false);
  });
});

describe('formaterCityObjetWithParameters', () => {
    test('should correctly format the city object with the given parameters', () => {
      const responseGetWeatherData = {
        coord: { lon: -62.0827, lat: -31.428 },
        weather: [
          { id: 803, main: 'Clouds', description: 'muy nuboso', icon: '04d' }
        ],
        base: 'stations',
        main: {
          temp: 8.23,
          feels_like: 5.8,
          temp_min: 8.23,
          temp_max: 8.23,
          pressure: 1020,
          humidity: 70,
          sea_level: 1020,
          grnd_level: 1007
        },
        visibility: 10000,
        wind: { speed: 4.05, deg: 196, gust: 12.02 },
        clouds: { all: 62 },
        dt: 1715944575,
        sys: {
          type: 2,
          id: 2006412,
          country: 'AR',
          sunrise: 1715943032,
          sunset: 1715980751
        },
        timezone: -10800,
        id: 3837675,
        name: 'San Francisco',
        cod: 200
      };
  
      const formattedCity = formaterCityObjetWithParameters(responseGetWeatherData);
  
      expect(formattedCity).toEqual({
        city: 'San Francisco',
        country: 'AR',
        coord: { lat: -31.428, lon: -62.0827 }
      });
    });
  
    test('should correctly handle cases where city data is not available', () => {
      const responseGetWeatherData = {};
  
      const formattedCity = formaterCityObjetWithParameters(responseGetWeatherData);
  
      expect(formattedCity).toEqual({
        city: 'No city available',
        country: 'No coutry available',
        coord: { lat: 'No lat available', lon: 'No lon available' },
      });
    });
});

describe('getWeatherForecast5Days', () => {
  it('should return an array of weather forecast for 5 days with correct data', () => {
      const forestWeatherData = {
          list: [
              {
                dt_txt: '2024-05-16 12:00:00',
                main: {
                  temp: 20,
                  humidity: 70,
                },
                weather: [
                    {
                      description: 'Cloudy',
                    },
                ],
                wind: {
                  speed: 5,
                },
              },
          ],
      };

      const temperatureSymbol = 'C';

      const result = getWeatherForecast5Days(forestWeatherData, temperatureSymbol);

      expect(Array.isArray(result)).toBe(true);

      expect(result.length).toBe(forestWeatherData.list.length);

      result.forEach((entry: any) => {
          expect(entry).toHaveProperty('dateTime');
          expect(entry).toHaveProperty('temperature');
          expect(entry).toHaveProperty('humidity');
          expect(entry).toHaveProperty('weatherDescription');
          expect(entry).toHaveProperty('windSpeed');

          expect(entry.dateTime).toBeDefined();
          expect(entry.temperature).toBeDefined();
          expect(entry.humidity).toBeDefined();
          expect(entry.weatherDescription).toBeDefined();
          expect(entry.windSpeed).toBeDefined();

          expect(typeof entry.dateTime).toBe('string');
          expect(typeof entry.temperature).toBe('object');
          expect(entry.temperature).toHaveProperty('unit', temperatureSymbol);
          expect(typeof entry.temperature.value).toBe('number');
          expect(typeof entry.humidity).toBe('object');
          expect(entry.humidity).toHaveProperty('unit', '%');
          expect(typeof entry.humidity.value).toBe('number');
          expect(typeof entry.weatherDescription).toBe('string');
          expect(typeof entry.windSpeed).toBe('object');
          expect(entry.windSpeed).toHaveProperty('unit', 'M/S');
          expect(typeof entry.windSpeed.value).toBe('number');
      });
  });
});
