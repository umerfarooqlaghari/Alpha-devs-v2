import { Router } from 'express';
import { getPageMedia, updatePageMedia } from '../controllers/pagemedia.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getPageMedia);
router.put('/', authenticate as any, authorize(['ADMIN', 'SUPER_ADMIN']) as any, updatePageMedia);

export default router;
