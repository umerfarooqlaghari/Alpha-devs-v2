import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        res.json(services);
    } catch (error) {
        console.error('getServices error:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
        const { title, description, keywords, videoUrl, order } = req.body;
        const service = await prisma.service.create({
            data: {
                title,
                description,
                keywords,
                videoUrl,
                order: order || 0,
            },
        });
        res.json(service);
    } catch (error) {
        console.error('createService error:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
};

export const updateService = async (req: Request, res: Response) => {
    const { id } = (req as any).params;
    try {
        const { title, description, keywords, videoUrl, order } = req.body;
        const service = await prisma.service.update({
            where: { id },
            data: {
                title,
                description,
                keywords,
                videoUrl,
                order,
            },
        });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    const { id } = (req as any).params;
    try {
        await prisma.service.delete({
            where: { id },
        });
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
};
