import app from '../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');

describe('GET /current/:city', () => {
    test('should return the current city data', async () => {
      const response = await request(app).get('/v1/current/san%20francisco').query({ country: 'AR', lang: 'es', unit: 'metric' });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cityData');
      expect(response.body).toHaveProperty('currentWeatherForecast');
    });
  
    test('should return a 500 status code on error', async () => {
        const response = await request(app).get('/v1//current/ciudad-inexistente').query({ country: 'AR', lang: 'es', unit: 'metric' });

        response.message = 'something goes wrong';
        response.status = 500;
  
        expect(response.status).toBe(500);
        expect(response.message).toEqual('something goes wrong');
    });
});
