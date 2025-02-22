# WeatherWiz 🌦️

WeatherWiz is a user-friendly weather dashboard application that fetches and displays weather forecasts using the OpenWeather API. Built with TypeScript on the front end and Node.js with Express on the back end, WeatherWiz is designed for efficiency and scalability.

## Features
- **Current Weather**: Get up-to-date weather information for your location.
- **5-Day Forecast**: Plan ahead with a 5-day weather forecast.
- **Geolocation**: Automatically fetch weather data based on your current location.
- **Search**: Look up weather information for any city in the world.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## Installation
1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/WeatherWiz.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd WeatherWiz
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Create a `.env` file in the root directory and add your OpenWeather API key**:
    ```sh
    API_KEY=your_openweather_api_key
    ```

5. **Start the development server**:
    ```sh
    npm start
    ```

## Usage
Open your browser and navigate to `http://localhost:3000`. Enter a city name or use geolocation to fetch weather data.

## API
- **GET** `/api/weather?lat={lat}&lon={lon}`: Fetch weather data for the specified latitude and longitude.

## License
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact
For any inquiries, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Happy coding! 🚀
