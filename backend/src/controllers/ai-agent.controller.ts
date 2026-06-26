import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAgents = async (req: Request, res: Response) => {
    try {
        const { category, businessFunction, domain, industry, status } = req.query;

        const where: Record<string, unknown> = {};
        if (category) where.category = category as string;
        if (businessFunction) where.businessFunction = businessFunction as string;
        if (domain) where.domain = domain as string;
        if (industry) where.industry = industry as string;
        if (status) where.status = status as string;

        const agents = await (prisma as any).aIAgent.findMany({
            where,
            orderBy: { order: 'asc' },
        });

        res.json(agents);
    } catch (error) {
        console.error('getAgents error:', error);
        res.status(500).json({ error: 'Failed to fetch AI agents' });
    }
};

export const getAgent = async (req: Request, res: Response) => {
    const { idOrSlug } = req.params;
    try {
        const agent = await (prisma as any).aIAgent.findFirst({
            where: {
                OR: [{ id: idOrSlug }, { slug: idOrSlug }],
            },
        });

        if (!agent) {
            return res.status(404).json({ error: 'AI agent not found' });
        }

        res.json(agent);
    } catch (error) {
        console.error('getAgent error:', error);
        res.status(500).json({ error: 'Failed to fetch AI agent' });
    }
};

export const createAgent = async (req: Request, res: Response) => {
    try {
        const {
            name, tagline, description, category, businessFunction,
            domain, industry, status, iconColor, order, slug,
        } = req.body;

        const agent = await (prisma as any).aIAgent.create({
            data: {
                name,
                slug: slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                tagline,
                description,
                category: category || 'Alpha Dev',
                businessFunction,
                domain,
                industry,
                status: status || 'LIVE',
                iconColor: iconColor || '#4A5D4E',
                order: order || 0,
            },
        });

        res.status(201).json(agent);
    } catch (error) {
        console.error('createAgent error:', error);
        res.status(500).json({ error: 'Failed to create AI agent' });
    }
};

export const updateAgent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const {
            name, slug, tagline, description, category, businessFunction,
            domain, industry, status, iconColor, order,
        } = req.body;

        const agent = await (prisma as any).aIAgent.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(slug !== undefined && { slug }),
                ...(tagline !== undefined && { tagline }),
                ...(description !== undefined && { description }),
                ...(category !== undefined && { category }),
                ...(businessFunction !== undefined && { businessFunction }),
                ...(domain !== undefined && { domain }),
                ...(industry !== undefined && { industry }),
                ...(status !== undefined && { status }),
                ...(iconColor !== undefined && { iconColor }),
                ...(order !== undefined && { order }),
            },
        });

        res.json(agent);
    } catch (error) {
        console.error('updateAgent error:', error);
        res.status(500).json({ error: 'Failed to update AI agent' });
    }
};

export const deleteAgent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await (prisma as any).aIAgent.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('deleteAgent error:', error);
        res.status(500).json({ error: 'Failed to delete AI agent' });
    }
};
