import { Router } from 'express';
import serverRoutes from './servers.js';
import announcementRoutes from './announcements.js';
import feedbackRoutes from './feedback.js';
import healthRoutes from './health.js';

const router = Router();

router.use('/servers', serverRoutes);
router.use('/announcements', announcementRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/health', healthRoutes);

export default router;