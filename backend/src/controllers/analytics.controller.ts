import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const logEvent = async (req: Request, res: Response) => {
    try {
        const { type, target } = req.body;

        if (!type || !target) {
            console.warn('[ANALYTICS] Missing type or target:', { type, target });
            return res.status(400).json({ error: 'Missing type or target' });
        }

        // Basic bot detection / IP info
        const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        // 1. Log the individual event
        const event = await prisma.analyticsEvent.create({
            data: {
                type,
                target,
                ip,
                browser: userAgent,
            }
        });

        // 2. Increment the aggregated stat for speed
        const stat = await prisma.analyticsStat.upsert({
            where: {
                type_key: {
                    type,
                    key: target
                }
            },
            update: {
                count: { increment: 1 }
            },
            create: {
                type,
                key: target,
                count: 1
            }
        });

        res.status(200).json({ success: true });
    } catch (error: any) {
        console.error('[ANALYTICS ERROR] Failed to log event:', error.message);
        console.error(error);
        res.status(500).json({ error: 'Internal server error logging event', details: error.message });
    }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const pageViews = await prisma.analyticsStat.findMany({
            where: { type: 'PAGE_VIEW' },
            orderBy: { count: 'desc' },
            take: 20
        });

        const clickCounts = await prisma.analyticsStat.findMany({
            where: { type: 'CLICK' },
            orderBy: { count: 'desc' },
            take: 20
        });

        // Get total events for a quick summary
        const totalViews = pageViews.reduce((acc, curr) => acc + curr.count, 0);
        const totalClicks = clickCounts.reduce((acc, curr) => acc + curr.count, 0);

        // Recent events
        const recentEvents = await prisma.analyticsEvent.findMany({
            orderBy: { timestamp: 'desc' },
            take: 50
        });

        res.json({
            summary: {
                totalViews,
                totalClicks,
            },
            pageViews,
            clickCounts,
            recentEvents
        });
    } catch (error) {
        console.error('Error fetching analytics stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
};
