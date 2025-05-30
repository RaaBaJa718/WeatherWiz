import { Router, Request, Response } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const router = Router();
const apiKey = process.env.API_KEY;
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

    const history = readSearchHistory();
    history.push({ id, city, weatherData });
    writeSearchHistory(history);

    res.json(weatherData);
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