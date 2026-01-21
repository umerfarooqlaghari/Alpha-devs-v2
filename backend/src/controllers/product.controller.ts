import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { order: 'asc' },
            include: {
                infoCards: true,
                contentBlocks: true
            }
        });
        res.json(products);
    } catch (error) {
        console.error('getProducts error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const { idOrSlug } = req.params as any;
    try {
        const product = await (prisma as any).product.findFirst({
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

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('getProduct error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            name, tagline, category, description, features, imageUrl,
            imagePublicId, videoUrl, videoPublicId, order, slug,
            heroTitle, heroSubtitle, heroDescription,
            infoCards, contentBlocks
        } = req.body;

        const product = await (prisma as any).product.create({
            data: {
                name,
                slug: slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                tagline,
                category,
                description,
                heroTitle,
                heroSubtitle,
                heroDescription,
                features,
                imageUrl,
                imagePublicId,
                videoUrl,
                videoPublicId,
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
        res.json(product);
    } catch (error) {
        console.error('createProduct error:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params as any;
    try {
        const {
            name, tagline, category, description, features, imageUrl,
            imagePublicId, videoUrl, videoPublicId, order, slug,
            heroTitle, heroSubtitle, heroDescription,
            infoCards, contentBlocks
        } = req.body;

        // Clean overwrite for nested relations for simplicity
        await (prisma as any).productInfoCard.deleteMany({ where: { productId: id } });
        await (prisma as any).productContentBlock.deleteMany({ where: { productId: id } });

        const product = await (prisma as any).product.update({
            where: { id },
            data: {
                name,
                slug: slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                tagline,
                category,
                description,
                heroTitle,
                heroSubtitle,
                heroDescription,
                features,
                imageUrl,
                imagePublicId,
                videoUrl,
                videoPublicId,
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
        res.json(product);
    } catch (error) {
        console.error('updateProduct error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params as any;
    try {
        const product = await (prisma as any).product.findUnique({
            where: { id },
            include: {
                infoCards: true,
                contentBlocks: true
            }
        });

        if (product) {
            // Delete media from Cloudinary
            const mediaToDelete = [
                { id: (product as any).imagePublicId, type: 'image' },
                { id: (product as any).videoPublicId, type: 'video' },
                ...((product as any).infoCards || []).map((c: any) => ({ id: c.publicId, type: 'image' })),
                ...((product as any).contentBlocks || []).map((b: any) => ({ id: b.publicId, type: 'image' }))
            ].filter((m: any) => m.id);

            for (const m of mediaToDelete) {
                await cloudinary.uploader.destroy(m.id as string, { resource_type: m.type as any });
            }
        }

        await (prisma as any).product.delete({
            where: { id },
        });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('deleteProduct error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
