import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/api/index.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://weatherwiz-1-45ot.onrender.com'
}));
app.use(express.json());
app.use('/api', apiRouter);

// Add this route for the root path
app.get('/', (_req: Request, res: Response) => {
  res.send('WeatherWiz API is running!');
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log('API_KEY:', process.env.API_KEY);
