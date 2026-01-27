import { Router } from 'express';
import {
    getOptimizations,
    getOptimizationByPath,
    upsertOptimization,
    deleteOptimization
} from '../controllers/optimization.controller';

const router = Router();

router.get('/', getOptimizations);
router.get('/path', getOptimizationByPath);
router.post('/', upsertOptimization);
router.delete('/:id', deleteOptimization);

export default router;
