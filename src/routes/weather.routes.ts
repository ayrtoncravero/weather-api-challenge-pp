import { Router } from 'express';
import {
    location,
    currentCity,
    forecastCity,
} from '../controllers/weather.controller';
const router = Router();

/**
 * @swagger
 * /v1/location:
 *   get:
 *     tags:
 *       - Ubicación
 *     summary: Obtener ubicacion actual
 *     description: Obtener ubicacion actual
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                  "city": "San Francisco",
 *                  "country": "AR",
 *                  "coord": {
 *                     "lat": -31.4297,
 *                     "lon": -61.9103
 *                  }
 *               }
 *       500:
 *         description: Error interno del servidor
 */
router.get('/location', location);

/**
 * @swagger
 * /v1/current/{city}:
 *   get:
 *     tags:
 *       - Ubicación
 *     summary: Obtener ubicacion y clima actual
 *     description: Obtener el clima actual para una ciudad específica
 *     parameters:
 *       - in: path
 *         name: city
 *         description: Nombre de la ciudad
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: country
 *         description: Código de país (ISO 3166-1)
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: lang
 *         description: Idioma de la respuesta
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: unit
 *         description: Unidad de temperatura (metric/imperial/standard)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             example:
 *               data: {
 *                  "cityData": {
 *                      "city": "San Francisco",
 *                      "country": "AR",
 *                      "coord": {
 *                          "lat": -31.428,
 *                          "lon": -62.0827
 *                      }
 *                  },
 *                  "currentWeatherForecast": {
 *                      "description": "nubes",
 *                      "timezone": "America/Argentina/Cordoba",
 *                      "temperature": {
 *                          "unit": "°C",
 *                          "value": 10.46
 *                      },
 *                      "humidity": {
 *                          "unit": "%",
 *                          "value": 66
 *                      },
 *                      "windSpeed": {
 *                          "unit": "M/S",
 *                          "value": 1.16
 *                      }
 *                  }
 *               }
 *       500:
 *         description: Error interno del servidor  
 */
router.get('/current/:city?', currentCity);

/**
 * @swagger
 * /v1/forecast/{city}:
 *   get:
 *     tags:
 *       - Ubicación
 *     summary: Obtener ubicacion y pronóstico del tiempo para una ciudad específica durante los próximos 5 días
 *     description: Obtener ubicacion y pronóstico del tiempo para una ciudad específica durante los próximos 5 días
 *     parameters:
 *       - in: path
 *         name: city
 *         description: Nombre de la ciudad
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: country
 *         description: Código de país (ISO 3166-1)
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: lang
 *         description: Idioma de la respuesta
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: unit
 *         description: Unidad de temperatura (metric/imperial/standard)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         {
 *            "cityData": {
 *                "city": "San Francisco",
 *                "country": "AR",
 *                "coord": {
 *                    "lat": -31.428,
 *                    "lon": -62.0827
 *                }
 *            },
 *            "currentWeatherForecast": {
 *                "description": "nubes",
 *                "timezone": "-03:00",
 *                "temperature": {
 *                    "unit": "°C",
 *                    "value": 10.17
 *                },
 *                "humidity": {
 *                    "unit": "%",
 *                    "value": 66
 *                },
 *                "windSpeed": {
 *                    "unit": "M/S",
 *                    "value": 1.14
 *                }
 *            }
 *          }
 *       500:
 *         description: Error interno del servidor
 */
router.get('/forecast/:city?', forecastCity);

export default router;
