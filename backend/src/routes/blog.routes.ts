import { Router } from 'express';
import { getBlogPosts, getBlogPostBySlug, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blog.controller';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', createBlogPost);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;
