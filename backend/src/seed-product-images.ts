/**
 * Seed product images: fetches og:image from each product's website,
 * uploads to S3, and updates the product record in the DB.
 *
 * Run: npx ts-node -r dotenv/config src/seed-product-images.ts
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { uploadToS3 } from './lib/s3';
import https from 'https';
import http from 'http';
import { URL } from 'url';

const prisma = new PrismaClient();

// Products with known public websites to scrape
const PRODUCT_SITES: Record<string, string> = {
    'grabengo':          'https://grabengo.store/',
    'supply-chain-hub':  'https://stride-two-mauve.vercel.app/',
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function fetchText(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const mod = parsed.protocol === 'https:' ? https : http;
        const req = mod.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AlphaDevBot/1.0)' }
        }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // follow redirect
                resolve(fetchText(res.headers.location));
                return;
            }
            let data = '';
            res.on('data', (chunk: Buffer) => { data += chunk.toString(); });
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('Request timed out')); });
    });
}

function fetchBuffer(url: string): Promise<{ buffer: Buffer; contentType: string }> {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const mod = parsed.protocol === 'https:' ? https : http;
        const req = mod.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AlphaDevBot/1.0)' }
        }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                resolve(fetchBuffer(res.headers.location));
                return;
            }
            const chunks: Buffer[] = [];
            res.on('data', (chunk: Buffer) => chunks.push(chunk));
            res.on('end', () => resolve({
                buffer: Buffer.concat(chunks),
                contentType: res.headers['content-type'] || 'image/jpeg',
            }));
        });
        req.on('error', reject);
        req.setTimeout(20000, () => { req.destroy(); reject(new Error('Image fetch timed out')); });
    });
}

function extractOgImage(html: string, baseUrl: string): string | null {
    // og:image content
    const patterns = [
        /property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
        /content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
        /name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
        /content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    ];
    for (const pat of patterns) {
        const m = html.match(pat);
        if (m) {
            const imgUrl = m[1].trim();
            if (imgUrl.startsWith('http')) return imgUrl;
            // Resolve relative URL
            try {
                return new URL(imgUrl, baseUrl).href;
            } catch { continue; }
        }
    }
    return null;
}

function extFromContentType(ct: string): string {
    if (ct.includes('png'))  return 'png';
    if (ct.includes('webp')) return 'webp';
    if (ct.includes('gif'))  return 'gif';
    if (ct.includes('svg'))  return 'svg';
    return 'jpg';
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🖼  Seeding product images → S3\n');

    const products = await (prisma as any).product.findMany({
        orderBy: { order: 'asc' },
    });

    for (const product of products) {
        const siteUrl = PRODUCT_SITES[product.slug];

        if (!siteUrl) {
            console.log(`  ⏭  ${product.name} — no website URL configured, skipping`);
            continue;
        }

        if (product.imageUrl?.includes('.amazonaws.com')) {
            console.log(`  ⏭  ${product.name} — already has S3 image`);
            continue;
        }

        console.log(`  🌐 ${product.name} → fetching ${siteUrl}`);

        try {
            const html = await fetchText(siteUrl);
            const ogImageUrl = extractOgImage(html, siteUrl);

            if (!ogImageUrl) {
                console.log(`     ⚠  No og:image found for ${product.name}`);
                continue;
            }

            console.log(`     📷 og:image: ${ogImageUrl}`);

            const { buffer, contentType } = await fetchBuffer(ogImageUrl);
            const ext = extFromContentType(contentType);
            const s3Key = `products/${product.slug}.${ext}`;

            const s3Url = await uploadToS3(s3Key, buffer, contentType);

            await (prisma as any).product.update({
                where: { id: product.id },
                data: { imageUrl: s3Url },
            });

            console.log(`     ✅ Uploaded & saved: ${s3Url}`);
        } catch (err: any) {
            console.error(`     ❌ Failed for ${product.name}: ${err.message}`);
        }
    }

    console.log('\n✅ Image seeding complete.');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
