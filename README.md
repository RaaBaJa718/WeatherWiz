# WeatherWiz 🌦️

---

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

WeatherWiz is a full-stack weather dashboard application that allows users to search for a city and view the current weather and 5-day forecast. The app also keeps a history of searched cities, which can be deleted individually. The backend is built with Node.js, Express, and TypeScript, and the frontend uses Vite and TypeScript.

---

## Features

- Search for any city to get current weather and a 5-day forecast
- View and manage search history
- Responsive and modern UI
- Caching of search results for faster repeated lookups
- Deployed on [Render](https://weatherwiz-1-45ot.onrender.com)
- Live Demo: [https://weatherwiz-1-45ot.onrender.com](https://weatherwiz-1-45ot.onrender.com)

---

## Tech Stack

- **Frontend:** Vite, TypeScript, HTML, CSS
- **Backend:** Node.js, Express, TypeScript
- **API:** [OpenWeatherMap](https://openweathermap.org/api)
- **Deployment:** Render

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Clone the Repository

```sh
git clone https://github.com/yourusername/weatherwiz.git
cd weatherwiz
```

---

### Backend Setup

1. Go to the server directory:
    ```sh
    cd server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `server` directory:
    ```
    API_KEY=your_openweathermap_api_key
    ```

4. Build and start the server:
    ```sh
    npm run build
    npm start
    ```

   The backend will run on `http://localhost:3001` by default.

---

### Frontend Setup

1. Open a new terminal and go to the client directory:
    ```sh
    cd client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. (Optional) Create a `.env` file for local API proxy (leave blank for proxy):
    ```
    VITE_API_URL=
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

   The frontend will run on `http://localhost:3000` by default.

---

## Deployment

### On Render

- **Backend:** Deploy the `server` folder as a web service. Set the build command to `npm install && npm run build` and the start command to `npm start`. Add your `API_KEY` as an environment variable.
- **Frontend:** Deploy the `client` folder as a static site or web service. Set the build command to `npm install && npm run build` and the start command to `npm run preview`. Set the environment variable `VITE_API_URL` to your backend’s Render URL (e.g., `https://your-backend.onrender.com`).
- **Frontend:** [https://weatherwiz-1-45ot.onrender.com](https://weatherwiz-1-45ot.onrender.com)
- **Backend:** [https://your-backend-service.onrender.com](https://your-backend-service.onrender.com)

---

## Environment Variables

**Backend (`server/.env`):**
```
API_KEY=your_openweathermap_api_key
```

**Frontend (`client/.env` for production on Render):**
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Usage

1. Enter a city name in the search bar and submit.
2. View the current weather and 5-day forecast.
3. Your search history will appear below the search bar. Click a city to view its weather again, or click the trash icon to remove it from history.

---

## License

MIT

---

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Render](https://render.com/)
Happy coding! 🚀
