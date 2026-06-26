import { Router } from 'express';
import {
    getAgents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
} from '../controllers/ai-agent.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAgents);
router.get('/:idOrSlug', getAgent);
router.post('/', authenticate, createAgent);
router.put('/:id', authenticate, updateAgent);
router.delete('/:id', authenticate, deleteAgent);

export default router;
