/**
 * Seed curated images for existing products that don't have one.
 * Uses high-quality Unsplash CDN URLs (free to use, no key required).
 *
 * Run: npx ts-node -r dotenv/config src/seed-curated-images.ts
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Curated Unsplash images per product slug
// Format: ?w=1200&q=85&fit=crop&auto=format for consistent sizing
const CURATED: Record<string, string> = {
    // AI-Powered ERP — futuristic AI / data intelligence
    'ai-erp':
        'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=85&fit=crop&auto=format',

    // Computer Vision (Safety Monitoring) — industrial surveillance / factory floor
    'cv-safety':
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85&fit=crop&auto=format',

    // Sales Scheduler (Pharma) — healthcare / pharmaceutical field sales
    'pharma-sales':
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85&fit=crop&auto=format',

    // Alpha Survey — data analytics / survey charts dashboard
    'alpha-survey':
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&fit=crop&auto=format',

    // Mentore Ed-Tech — modern online learning / collaboration
    'mentore-edtech':
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85&fit=crop&auto=format',
};

async function main() {
    console.log('🖼  Setting curated images for products...\n');

    for (const [slug, imageUrl] of Object.entries(CURATED)) {
        const product = await (prisma as any).product.findFirst({ where: { slug } });

        if (!product) {
            console.log(`  ⚠  Not found: ${slug}`);
            continue;
        }

        if (product.imageUrl && product.imageUrl.includes('unsplash') || product.imageUrl?.includes('amazonaws')) {
            console.log(`  ⏭  Already has image: ${product.name}`);
            continue;
        }

        await (prisma as any).product.update({
            where: { id: product.id },
            data: { imageUrl },
        });

        console.log(`  ✅ ${product.name}`);
        console.log(`     ${imageUrl}\n`);
    }

    console.log('✅ Done.');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
