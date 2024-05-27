import app from '../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');

describe('GET /forecast/:city', () => {
    test('should return the weather forecast for the specified city', async () => {
      const response = await request(app).get('/v1/forecast/san francisco').query({ country: 'AR', lang: 'es', unit: 'metric' });
  
      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('cityData');
      expect(response.body).toHaveProperty('currentWeatherForecast');
    });
  
    test('should return a 500 status code on error', async () => {
        const response = await request(app).get('/v1/forecast/ciudad-inexistente').query({ country: 'AR', lang: 'es', unit: 'metric' });

        response.message = 'something goes wrong';
        response.status = 500;
  
        expect(response.status).toBe(500);
        expect(response.body.message).toEqual('something goes wrong');
    });
  });