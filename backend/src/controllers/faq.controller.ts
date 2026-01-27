import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getFAQs = async (req: Request, res: Response) => {
    try {
        const faqs = await (prisma as any).fAQ.findMany({
            orderBy: { order: 'asc' }
        });
        res.json(faqs);
    } catch (error) {
        console.error('getFAQs error:', error);
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
};

export const createFAQ = async (req: Request, res: Response) => {
    try {
        const faq = await (prisma as any).fAQ.create({
            data: req.body
        });
        res.json(faq);
    } catch (error) {
        console.error('createFAQ error:', error);
        res.status(500).json({ error: 'Failed to create FAQ' });
    }
};

export const updateFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const faq = await (prisma as any).fAQ.update({
            where: { id },
            data: req.body
        });
        res.json(faq);
    } catch (error) {
        console.error('updateFAQ error:', error);
        res.status(500).json({ error: 'Failed to update FAQ' });
    }
};

export const deleteFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await (prisma as any).fAQ.delete({
            where: { id }
        });
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error('deleteFAQ error:', error);
        res.status(500).json({ error: 'Failed to delete FAQ' });
    }
};
