import { Router, Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const searchHistoryPath = path.join(__dirname, '../../searchHistory.json');

// Helper function to read search history
const readSearchHistory = (): any[] => {
  try {
    if (!fs.existsSync(searchHistoryPath)) {
      return [];
    }
    const data = fs.readFileSync(searchHistoryPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Helper function to write search history
const writeSearchHistory = (data: any[]) => {
  fs.writeFileSync(searchHistoryPath, JSON.stringify(data, null, 2));
};

// GET /api/weather/history
router.get('/history', (_req: Request, res: Response) => {
  const history = readSearchHistory();
  res.json(history);
});

// POST /api/weather
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const apiKey = process.env.API_KEY;
  const { city } = req.body;
  if (!city) {
    res.status(400).json({ error: 'City is required' });
    return;
  }
  if (!apiKey) {
    res.status(500).json({ error: 'API_KEY is not set in environment variables' });
    return;
  }
  const id = uuidv4();

  try {
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
    );
    if (!geoResponse.data || geoResponse.data.length === 0) {
      res.status(404).json({ error: 'City not found' });
      return;
    }
    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const weatherData = weatherResponse.data;

    // Helper to convert Kelvin to Fahrenheit
    const kelvinToF = (k: number) => Math.round((k - 273.15) * 9/5 + 32);

    // Build current weather object
    const current = {
      city,
      date: weatherData.list[0].dt_txt.split(' ')[0],
      icon: weatherData.list[0].weather[0].icon,
      iconDescription: weatherData.list[0].weather[0].description,
      tempF: kelvinToF(weatherData.list[0].main.temp),
      windSpeed: weatherData.list[0].wind.speed,
      humidity: weatherData.list[0].main.humidity,
    };

    // Build 5-day forecast (one per day at noon)
    const forecast = weatherData.list
      .filter((item: any) => item.dt_txt.includes('12:00:00'))
      .map((item: any) => ({
        date: item.dt_txt.split(' ')[0],
        icon: item.weather[0].icon,
        iconDescription: item.weather[0].description,
        tempF: kelvinToF(item.main.temp),
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
      }));

    // Save to history
    const history = readSearchHistory();
    history.push({ id, city, weatherData });
    writeSearchHistory(history);

    // Always respond with an array!
    res.json([current, ...forecast]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// DELETE /api/weather/history/:id
router.delete('/history/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let history = readSearchHistory();
  const newHistory = history.filter((entry: any) => entry.id !== id);
  writeSearchHistory(newHistory);
  res.json({ message: 'City deleted' });
});

export default router;