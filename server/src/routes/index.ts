import { Router } from 'express';
import weatherRoutes from './routes/api/weatherRoutes';
const router = Router();

// Use the weather routes
router.use('/weather', weatherRoutes);

export default router;
