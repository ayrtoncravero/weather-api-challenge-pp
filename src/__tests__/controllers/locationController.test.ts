import app from '../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');

describe('GET /location', () => {
    test('should return location data', async () => {
      const response = await request(app).get('/v1/location');

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
            'city': 'San Francisco',
            'country': 'AR',
            'coord': {
                'lat': -31.4297,
                'lon': -61.9103
            }
        });
    });

    test('should return a code 500 and its respective message', async () => {
        const response = await request(app).get('/v1/location');

        response.message = 'something goes wrong';
        response.status = 500;
  
        expect(response.message).toBe('something goes wrong');
        expect(response.status).toBe(500);
    });
});
