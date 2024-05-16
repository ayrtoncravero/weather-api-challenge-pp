import { Router } from 'express';
import {
    location,
    currentCity,
    forecastCity,
} from '../controllers/weather.controller';
const router = Router();

router.get('/location', location);
router.get('/current/:city?', currentCity);
router.get('/forecast/:city?', forecastCity);

export default router;
