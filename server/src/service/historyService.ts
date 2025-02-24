import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import WeatherService from './weatherService';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(__dirname, '../../db/db.json');

// Get weather history
export const getWeatherHistory = (_: Request, res: Response) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
};

// Add city weather
export const addCityWeather = async (req: Request, res: Response) => {
    const { cityName } = req.body;

    try {
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        const cityData = {
            id: uuidv4(),
            city: cityName,
            weather: weatherData
        };

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        data.push(cityData);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.json(cityData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

// Delete city weather by id
export const deleteCityWeather = (req: Request, res: Response) => {
    const { id } = req.params;
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    data = data.filter((city: { id: string }) => city.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.sendStatus(204);
};




