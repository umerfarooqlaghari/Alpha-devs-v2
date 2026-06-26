import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newProducts = [
    {
        name: 'Grabengo',
        slug: 'grabengo',
        tagline: 'Rescue Good Food. Save the Planet.',
        category: 'Software as a Service',
        description: 'Grabengo is a food waste reduction marketplace connecting consumers with local stores, cafes, bakeries, and supermarkets offering surplus food at up to 50% off. Every rescue bag directly fights the 1-in-3 global food waste crisis.',
        heroTitle: 'Rescue Good Food. Save the Planet.',
        heroSubtitle: 'Food Waste Reduction Platform',
        heroDescription: 'Connect with local stores, cafes, and bakeries offering surplus food at unbeatable prices. Rescue meals, help protect the planet, and save money — all in one app. Aligned with UNEP, FAO, and EU Farm-to-Fork principles.',
        features: [
            'Surprise Bags Marketplace',
            'End-to-End Surplus Management Suite',
            'Business Portal for Food Sellers',
            'Real-Time Stock & Availability Tracking',
            'FMCG & Grocery Integration',
            'Sustainability Impact Analytics Dashboard',
        ],
        imageUrl: null,
        order: 4,
        infoCards: {
            create: [
                {
                    title: 'Food Rescue Marketplace',
                    description: 'Connects consumers with 180,000+ local restaurants, bakeries, and supermarkets selling surplus food in mystery bags at up to 50% off retail price.',
                    tag: 'Consumer Platform',
                    order: 1,
                },
                {
                    title: 'Business Empowerment Suite',
                    description: 'Gives food sellers an end-to-end surplus management tool to track, list, and redistribute unsold stock intelligently — recovering revenue that would otherwise be lost.',
                    tag: 'B2B Platform',
                    order: 2,
                },
                {
                    title: 'Sustainability Impact',
                    description: 'Every bag rescued is a meal saved. Grabengo tracks and reports CO₂ avoided, water saved, and meals rescued — giving businesses and consumers a measurable environmental footprint.',
                    tag: 'ESG Reporting',
                    order: 3,
                },
            ],
        },
        contentBlocks: {
            create: [
                {
                    type: 'heading',
                    content: 'Fighting Food Waste at Scale',
                    order: 1,
                },
                {
                    type: 'text',
                    content: 'Around 1 in 3 meals produced globally are never eaten. Grabengo attacks this problem from both ends — making it easy for consumers to rescue quality food before it is discarded, and giving food businesses the tools to manage surplus intelligently. With 180,000+ businesses onboard and 2M+ bags rescued, the impact is real and measurable.',
                    order: 2,
                },
                {
                    type: 'heading',
                    content: 'From Supermarkets to Street Food',
                    order: 3,
                },
                {
                    type: 'text',
                    content: 'Grabengo is expanding beyond surplus meals to bring leading supermarkets onto the platform — offering premium discounts on FMCG, groceries, and household essentials under one unified rescue marketplace. One app. Food and FMCG rescue. Maximum impact.',
                    order: 4,
                },
            ],
        },
    },
    {
        name: 'Supply Chain Hub',
        slug: 'supply-chain-hub',
        tagline: 'Full Visibility. Zero Exceptions.',
        category: 'Enterprise Resource Planning',
        description: 'A five-module downstream supply chain platform spanning vessel intake through to SAP auto-invoice. Monitor, manage, and act across the entire pipeline with real-time dashboards, OCR document processing, smart fleet dispatch, digital proof of delivery, and seamless SAP HANA integration.',
        heroTitle: 'Full Supply Chain Visibility. End to End.',
        heroSubtitle: 'Downstream Digitisation Platform',
        heroDescription: 'Five interconnected modules spanning vessel intake through to SAP auto-invoice. Monitor, manage, and act across the entire downstream pipeline with 99.7% system uptime and real-time operational intelligence.',
        features: [
            'Upstream Intake & Berthing Module',
            'Transitional OCR Document Processing Hub',
            'Smart Gantry & Fleet Dispatch Module',
            'Digital e-POD Driver App',
            'O2C / SAP HANA Integration & Auto-Invoicing',
        ],
        imageUrl: null,
        order: 5,
        infoCards: {
            create: [
                {
                    title: '99.7% System Uptime',
                    description: 'Five active modules running in parallel with enterprise-grade redundancy. Real-time dashboards show 48,200 MT daily throughput and only 7 open exceptions across the entire pipeline.',
                    tag: 'Reliability',
                    order: 1,
                },
                {
                    title: '96.2% OCR Match Rate',
                    description: 'The Transitional OCR Hub processes 214+ documents per day with a 96.2% automated match rate — reducing manual document handling and dramatically cutting processing lead times.',
                    tag: 'Automation',
                    order: 2,
                },
                {
                    title: '98.1% SLA Met on O2C',
                    description: 'The O2C / SAP HANA module manages 127 open orders with 43 auto-invoiced daily. 98.1% of orders meet SLA targets, delivering a near-zero manual invoicing process.',
                    tag: 'SAP Integration',
                    order: 3,
                },
            ],
        },
        contentBlocks: {
            create: [
                {
                    type: 'heading',
                    content: 'Five Modules. One Unified Control Tower.',
                    order: 1,
                },
                {
                    type: 'text',
                    content: 'The Supply Chain Hub digitises the entire downstream pipeline — from vessel scheduling and berth allocation through OCR-powered document processing, crane and fleet dispatch, last-mile driver delivery confirmation, to fully automated SAP HANA sales order and invoice creation. Every module speaks to the others in real time, eliminating data silos and giving operators a single source of truth.',
                    order: 2,
                },
                {
                    type: 'heading',
                    content: 'Built for Industrial-Scale Operations',
                    order: 3,
                },
                {
                    type: 'text',
                    content: 'Designed for high-throughput downstream operations like petroleum distribution, port terminals, and bulk commodity handling. The platform currently manages 48,200 MT of daily throughput with 6 active gantry cranes, 23 trucks en route, and a live exception management layer that ensures nothing falls through the cracks.',
                    order: 4,
                },
            ],
        },
    },
];

async function main() {
    console.log('📦 Seeding new products...');

    for (const product of newProducts) {
        const existing = await (prisma as any).product.findFirst({ where: { slug: product.slug } });
        if (existing) {
            console.log(`  ⏭  Skipped (already exists): ${product.name}`);
            continue;
        }

        await (prisma as any).product.create({ data: product });
        console.log(`  ✓ Created: ${product.name}`);
    }

    console.log('\n✅ Done — new products seeded.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
