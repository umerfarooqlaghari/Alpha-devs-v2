/**
 * Downloads curated images and uploads them all to S3.
 * Handles both new products (Grabengo, Supply Chain Hub) and
 * re-hosts the existing Unsplash URLs into S3 for all products.
 *
 * Run: npx ts-node -r dotenv/config src/seed-upload-s3.ts
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { uploadToS3 } from './lib/s3';
import https from 'https';
import http from 'http';
import { URL } from 'url';

const prisma = new PrismaClient();

// Definitive image map: slug → best-match Unsplash URL
const IMAGE_MAP: Record<string, { url: string; ext: string }> = {
    'grabengo': {
        url: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
    'supply-chain-hub': {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
    'ai-erp': {
        url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
    'cv-safety': {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
    'pharma-sales': {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
    'alpha-survey': {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
    'mentore-edtech': {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=85&fit=crop&auto=format',
        ext: 'jpg',
    },
};

function fetchBuffer(rawUrl: string): Promise<{ buffer: Buffer; contentType: string }> {
    return new Promise((resolve, reject) => {
        const parsed = new URL(rawUrl);
        const mod = parsed.protocol === 'https:' ? https : http;
        mod.get(rawUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AlphaDevBot/1.0)' }
        }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(fetchBuffer(res.headers.location));
            }
            if (res.statusCode && res.statusCode >= 400) {
                return reject(new Error(`HTTP ${res.statusCode} for ${rawUrl}`));
            }
            const chunks: Buffer[] = [];
            res.on('data', (c: Buffer) => chunks.push(c));
            res.on('end', () => resolve({
                buffer: Buffer.concat(chunks),
                contentType: res.headers['content-type'] || 'image/jpeg',
            }));
            res.on('error', reject);
        }).on('error', reject);
    });
}

async function main() {
    console.log('☁️  Uploading product images to S3...\n');

    const products = await (prisma as any).product.findMany({ orderBy: { order: 'asc' } });

    for (const product of products) {
        const entry = IMAGE_MAP[product.slug];
        if (!entry) {
            console.log(`  ⏭  ${product.name} — not in map, skipping`);
            continue;
        }

        console.log(`  📥 ${product.name}`);
        console.log(`     source: ${entry.url.split('?')[0]}`);

        try {
            const { buffer, contentType } = await fetchBuffer(entry.url);
            const s3Key = `products/${product.slug}.${entry.ext}`;
            const s3Url = await uploadToS3(s3Key, buffer, contentType);

            await (prisma as any).product.update({
                where: { id: product.id },
                data: { imageUrl: s3Url },
            });

            console.log(`     ✅ ${s3Url}\n`);
        } catch (err: any) {
            console.error(`     ❌ ${err.message}\n`);
        }
    }

    console.log('✅ All done.');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
