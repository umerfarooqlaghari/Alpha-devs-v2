import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getPageMedia = async (req: Request, res: Response) => {
    try {
        const media = await (prisma as any).pageMedia.findMany();
        res.json(media);
    } catch (error) {
        console.error('getPageMedia error:', error);
        res.status(500).json({ error: 'Failed to fetch page media' });
    }
};

export const updatePageMedia = async (req: Request, res: Response) => {
    try {
        const { pageName, sectionName, fieldName, mediaType, url, publicId } = req.body;

        const media = await (prisma as any).pageMedia.upsert({
            where: {
                pageName_sectionName_fieldName: {
                    pageName,
                    sectionName,
                    fieldName
                }
            },
            update: {
                mediaType,
                url,
                publicId
            },
            create: {
                pageName,
                sectionName,
                fieldName,
                mediaType,
                url,
                publicId
            }
        });

        res.json(media);
    } catch (error) {
        console.error('updatePageMedia error:', error);
        res.status(500).json({ error: 'Failed to update page media' });
    }
};
