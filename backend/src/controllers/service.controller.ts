import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
            include: {
                infoCards: true,
                contentBlocks: true
            }
        });
        res.json(services);
    } catch (error) {
        console.error('getServices error:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
};

export const getService = async (req: Request, res: Response) => {
    const { idOrSlug } = req.params as any;
    try {
        const service = await (prisma as any).service.findFirst({
            where: {
                OR: [
                    { id: idOrSlug },
                    { slug: idOrSlug }
                ]
            },
            include: {
                infoCards: { orderBy: { order: 'asc' } },
                contentBlocks: { orderBy: { order: 'asc' } }
            }
        });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        console.error('getService error:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
        const {
            title, description, keywords, videoUrl, imageUrl, imagePublicId, order, slug,
            heroTitle, heroSubtitle, heroDescription,
            features, infoCards, contentBlocks
        } = req.body;

        const service = await (prisma as any).service.create({
            data: {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                description,
                keywords,
                heroTitle,
                heroSubtitle,
                heroDescription,
                features,
                videoUrl,
                imageUrl,
                imagePublicId,
                order: order || 0,
                infoCards: {
                    create: (infoCards || []).map((card: any, idx: number) => ({
                        title: card.title,
                        description: card.description,
                        tag: card.tag,
                        imageUrl: card.imageUrl,
                        publicId: card.publicId,
                        order: card.order || idx
                    }))
                },
                contentBlocks: {
                    create: (contentBlocks || []).map((block: any, idx: number) => ({
                        type: block.type,
                        content: block.content,
                        style: block.style,
                        imageUrl: block.imageUrl,
                        publicId: block.publicId,
                        order: block.order || idx
                    }))
                }
            },
            include: {
                infoCards: true,
                contentBlocks: true
            }
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
        const {
            title, description, keywords, videoUrl, imageUrl, imagePublicId, order, slug,
            heroTitle, heroSubtitle, heroDescription,
            features, infoCards, contentBlocks
        } = req.body;

        // Clean overwrite for nested relations
        await (prisma as any).serviceInfoCard.deleteMany({ where: { serviceId: id } });
        await (prisma as any).serviceContentBlock.deleteMany({ where: { serviceId: id } });

        const service = await (prisma as any).service.update({
            where: { id },
            data: {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                description,
                keywords,
                heroTitle,
                heroSubtitle,
                heroDescription,
                features,
                videoUrl,
                imageUrl,
                imagePublicId,
                order,
                infoCards: {
                    create: (infoCards || []).map((card: any, idx: number) => ({
                        title: card.title,
                        description: card.description,
                        tag: card.tag,
                        imageUrl: card.imageUrl,
                        publicId: card.publicId,
                        order: card.order || idx
                    }))
                },
                contentBlocks: {
                    create: (contentBlocks || []).map((block: any, idx: number) => ({
                        type: block.type,
                        content: block.content,
                        style: block.style,
                        imageUrl: block.imageUrl,
                        publicId: block.publicId,
                        order: block.order || idx
                    }))
                }
            },
            include: {
                infoCards: true,
                contentBlocks: true
            }
        });
        res.json(service);
    } catch (error) {
        console.error('updateService error:', error);
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
