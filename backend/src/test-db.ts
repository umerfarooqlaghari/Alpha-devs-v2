
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
    try {
        console.log('Fetching testimonials...');
        const testimonials = await prisma.testimonial.findMany();
        console.log('Success!', testimonials);
    } catch (error) {
        console.error('Failed!', error);
    } finally {
        await (prisma as any).$disconnect();
    }
}

main();
