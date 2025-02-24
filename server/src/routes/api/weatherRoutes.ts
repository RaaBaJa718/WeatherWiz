import { Router } from 'express';
import { getWeatherHistory, addCityWeather, deleteCityWeather } from '../../service/historyService';

const router = Router();

router.get('/weather/history', getWeatherHistory);
router.post('/weather', addCityWeather);
router.delete('/weather/history/:id', deleteCityWeather);

export default router;
