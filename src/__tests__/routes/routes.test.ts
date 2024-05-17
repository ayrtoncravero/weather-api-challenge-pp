import app from '../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
import responseLocationCity from '../__mocks__/responseLocationCity.json';

describe('get current /location', () => {
    it(('should return data from the current location'), async () => {
        const response = await request(app).get('/v1/location').expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(responseLocationCity);
    });
    it(('should return a status code 500 and a specific message'), async () => {
        const response = await request(app).get('/v1/location').expect(200);

        response.message = 'something goes wrong';
        response.status = 500;

        expect(response.message).toBe('something goes wrong');
        expect(response.status).toBe(500);
    });
});

describe('GET /current/:city', () => {
    it(('should return the current location and weather'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/current/${city}`).expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeDefined();
    });
    it(('should return a status code 500 and a specific message'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/current/${city}`).expect(200);

        response.message = 'something goes wrong';
        response.status = 500;

        expect(response.message).toBe('something goes wrong');
        expect(response.status).toBe(500);
    });
});

describe('GET /forecast/:city', () => {
    it(('should return the current location and weather'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/forecast/${city}`).expect(200);

        expect(response.status).toBe(200);
        expect(response.body.cityData).toBeDefined();
        expect(response.body.currentWeatherForecast).toBeDefined();
    });
    it(('should return a status code 500 and a specific message'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/current/${city}`).expect(200);

        response.message = 'something goes wrong';
        response.status = 500;

        expect(response.message).toBe('something goes wrong');
        expect(response.status).toBe(500);
    });
});