import { Router } from 'express';
import { getServices, getService, createService, updateService, deleteService } from '../controllers/service.controller';

const router = Router();

router.get('/', getServices);
router.get('/:idOrSlug', getService);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
