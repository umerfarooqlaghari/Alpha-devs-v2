import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getOptimizations = async (req: Request, res: Response) => {
    try {
        const optimizations = await prisma.siteOptimization.findMany({
            orderBy: { pagePath: 'asc' }
        });
        res.json(optimizations);
    } catch (error) {
        console.error('getOptimizations error:', error);
        res.status(500).json({ error: 'Failed to fetch optimizations' });
    }
};

export const getOptimizationByPath = async (req: Request, res: Response) => {
    const path = req.query.path as string;
    try {
        const optimization = await prisma.siteOptimization.findUnique({
            where: { pagePath: path || '/' }
        });
        res.json(optimization);
    } catch (error) {
        console.error('getOptimizationByPath error:', error);
        res.status(500).json({ error: 'Failed to fetch optimization' });
    }
};

export const upsertOptimization = async (req: Request, res: Response) => {
    const {
        pagePath, title, description, keywords,
        ogTitle, ogDescription, ogImage,
        structuredData, headerScripts, bodyScripts, footerScripts
    } = req.body;

    try {
        const optimization = await prisma.siteOptimization.upsert({
            where: { pagePath: pagePath as string },
            update: {
                title,
                description,
                keywords,
                ogTitle,
                ogDescription,
                ogImage,
                structuredData,
                headerScripts,
                bodyScripts,
                footerScripts
            },
            create: {
                pagePath,
                title,
                description,
                keywords,
                ogTitle,
                ogDescription,
                ogImage,
                structuredData,
                headerScripts,
                bodyScripts,
                footerScripts
            }
        });
        res.json(optimization);
    } catch (error) {
        console.error('upsertOptimization error:', error);
        res.status(500).json({ error: 'Failed to update optimization' });
    }
};

export const deleteOptimization = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.siteOptimization.delete({
            where: { id: id as string }
        });
        res.json({ message: 'Optimization deleted successfully' });
    } catch (error) {
        console.error('deleteOptimization error:', error);
        res.status(500).json({ error: 'Failed to delete optimization' });
    }
};
