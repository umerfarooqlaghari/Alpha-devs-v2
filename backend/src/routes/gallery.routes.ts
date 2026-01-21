import { Router } from 'express';
import { getGallery, saveMedia, deleteMedia, getUploadSignature } from '../controllers/gallery.controller';

const router = Router();

router.get('/', getGallery);
router.post('/', saveMedia);
router.delete('/:id', deleteMedia);
router.get('/signature', getUploadSignature);

export default router;
