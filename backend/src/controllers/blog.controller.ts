import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getBlogPosts = async (req: Request, res: Response) => {
    try {
        const posts = await (prisma as any).blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        console.error('getBlogPosts error:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
};

export const getBlogPostBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
        const post = await (prisma as any).blogPost.findUnique({
            where: { slug }
        });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        console.error('getBlogPostBySlug error:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
};

export const createBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await (prisma as any).blogPost.create({
            data: req.body
        });
        res.json(post);
    } catch (error) {
        console.error('createBlogPost error:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await (prisma as any).blogPost.update({
            where: { id },
            data: req.body
        });
        res.json(post);
    } catch (error) {
        console.error('updateBlogPost error:', error);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await (prisma as any).blogPost.delete({
            where: { id }
        });
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('deleteBlogPost error:', error);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
};
