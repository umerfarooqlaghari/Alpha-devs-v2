import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getTestimonials = async (req: Request, res: Response) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
};

export const createTestimonial = async (req: Request, res: Response) => {
    try {
        const { author, role, company, quote, image } = req.body;
        const testimonial = await prisma.testimonial.create({
            data: { author, role, company, quote, image },
        });
        res.status(201).json(testimonial);
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
};

export const updateTestimonial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { author, role, company, quote, image } = req.body;
        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { author, role, company, quote, image },
        });
        res.json(testimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ error: 'Failed to update testimonial' });
    }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        await prisma.testimonial.delete({
            where: { id },
        });
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
};
