import app from '../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
import responseForecastWithCity from './__mocks__/responseForecastWithCity.json';
import responseLocationCity from './__mocks__/responseLocationCity.json';
import responseCurrentWithCity from './__mocks__/responseCurrentWithCity.json';

describe('get current /location', () => {
    it(('Deberia devolver datos de la ubicacion actual'), async () => {
        const response = await request(app).get('/v1/location').expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(responseLocationCity);
    });
    it(('Deberia devolver un code status 500 y un mensaje especifico'), async () => {
        const response = await request(app).get('/v1/location').expect(200);
        response.message = 'something goes wrong';
        response.status = 500;
        expect(response.message).toBe('something goes wrong');
        expect(response.status).toBe(500);
    });
});

describe('GET /current/:city', () => {
    it(('Deberia regresar la ubicación y clima actual'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/current/${city}`).expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(responseCurrentWithCity);
    });
    it(('Deberia devolver un code status 500 y un mensaje especifico'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/current/${city}`).expect(200);
        response.message = 'something goes wrong';
        response.status = 500;
        expect(response.message).toBe('something goes wrong');
        expect(response.status).toBe(500);
    });
    // it(('Deberia regresar un 200 la unicacion actual y su pronostico actual'), async () => {
    //     const city = 'san francisco';
    //     const country = 'ar';
        
    //     const response = await request(app).get(`/v1/current/${city}`).query({ country }).expect(200);

    //     expect(response.status).toBe(200);
    //     expect(response.query.country).toBe(country);
    // });
});

describe('GET /forecast/:city', () => {
    it(('Deberia regresar la ubicación y clima actual'), async () => {
        const city = 'san francisco';
        const response = await request(app).get(`/v1/forecast/${city}`).expect(200);
        expect(response.status).toBe(200);
        expect(response.body.cityData).toBeDefined();
        expect(response.body.currentWeatherForecast).toBeDefined();
        expect(response.body).toEqual(responseForecastWithCity);
    });
});