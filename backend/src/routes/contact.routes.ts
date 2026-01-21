import { Router } from 'express';
import { handleContactForm, getContacts, updateContactStatus, deleteContact } from '../controllers/contact.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/', handleContactForm);
router.get('/', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), getContacts);
router.put('/:id', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), updateContactStatus);
router.delete('/:id', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), deleteContact);

export default router;

