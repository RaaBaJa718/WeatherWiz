import { Router } from 'express';
import weatherRoutes from './weatherRoutes';

const router = Router();

// Use the weather routes
router.use('/weather', weatherRoutes);

export default router;
