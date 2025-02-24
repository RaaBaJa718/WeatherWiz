import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

interface Coordinates {
    lat: number;
    lon: number;
}

interface Weather {
    temperature: number;
    description: string;
    // Add other relevant properties
}

class WeatherService {
    private baseURL: string = 'https://api.openweathermap.org/data/2.5';
    private apiKey: string = process.env.API_KEY!;
    
    // Fetch location data based on city name
    private async fetchLocationData(query: string): Promise<Coordinates> {
        const response = await axios.get(`${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`);
        const { lat, lon } = response.data.coord;
        return { lat, lon };
    }


    // Build a query string for weather data
    private buildWeatherQuery(coordinates: Coordinates): string {
        return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    }

    // Fetch weather data based on coordinates
    private async fetchWeatherData(coordinates: Coordinates): Promise<Weather[]> {
        const response = await axios.get(this.buildWeatherQuery(coordinates));
        return response.data.list.map((data: any) => ({
            temperature: data.main.temp,
            description: data.weather[0].description,
            // Map other relevant properties
        }));
    }

    // Get weather for a given city
    async getWeatherForCity(city: string): Promise<Weather[]> {
        const coordinates = await this.fetchLocationData(city);
        const weatherData = await this.fetchWeatherData(coordinates);
        return weatherData;
    }
}

export default new WeatherService();
