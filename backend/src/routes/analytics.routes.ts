import { Router } from 'express';
import { logEvent, getStats } from '../controllers/analytics.controller';

const router = Router();

router.post('/track', logEvent);
router.get('/stats', getStats);

export default router;
