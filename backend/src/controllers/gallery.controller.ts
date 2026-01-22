import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getGallery = async (req: Request, res: Response) => {
    try {
        const images = await prisma.cloudinaryImage.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch gallery' });
    }
};

export const saveMedia = async (req: Request, res: Response) => {
    try {
        const { publicId, url, format, width, height, size, folder } = req.body;
        const image = await prisma.cloudinaryImage.create({
            data: {
                publicId,
                url,
                format,
                width,
                height,
                size,
                folder,
            },
        });
        res.json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save media metadata' });
    }
};

export const deleteMedia = async (req: Request, res: Response) => {
    const { id } = (req as any).params;
    try {
        const image = await prisma.cloudinaryImage.findUnique({ where: { id } });
        if (!image) {
            return res.status(404).json({ error: 'Media not found' });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // Delete from DB
        await prisma.cloudinaryImage.delete({ where: { id } });

        res.json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete media' });
    }
};

export const getUploadSignature = (req: Request, res: Response) => {
    try {
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const requestedFolder = (req.query.folder || req.body?.folder) as string | undefined;
        const allowedFolders = new Set([
            'alpha-devs-gallery',
            'alpha-devs-services',
            'alpha-devs-products',
            'alpha-devs-testimonials'
        ]);
        const folder = allowedFolders.has(requestedFolder || '') ? requestedFolder! : 'alpha-devs-gallery';
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            folder
        }, process.env.CLOUDINARY_API_SECRET!);

        res.json({
            signature,
            timestamp,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate signature' });
    }
};
