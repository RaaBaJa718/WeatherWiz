import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './weatherRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the routes
app.use('/api', weatherRoutes);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

