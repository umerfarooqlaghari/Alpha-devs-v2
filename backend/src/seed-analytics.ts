import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial analytics data...');

    const pages = ['/', '/services', '/products', '/about', '/contact', '/faq', '/consultancy'];
    const buttons = ['home-hero-cta', 'nav-cta-booking', 'nav-link-services', 'nav-link-products', 'service-card-ai-automation'];

    // Seed Stats
    for (const page of pages) {
        await prisma.analyticsStat.upsert({
            where: { type_key: { type: 'PAGE_VIEW', key: page } },
            update: {},
            create: {
                type: 'PAGE_VIEW',
                key: page,
                count: Math.floor(Math.random() * 500) + 100
            }
        });
    }

    for (const btn of buttons) {
        await prisma.analyticsStat.upsert({
            where: { type_key: { type: 'CLICK', key: btn } },
            update: {},
            create: {
                type: 'CLICK',
                key: btn,
                count: Math.floor(Math.random() * 100) + 20
            }
        });
    }

    // Seed some recent events
    const eventTypes = ['PAGE_VIEW', 'CLICK'];
    for (let i = 0; i < 20; i++) {
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const target = type === 'PAGE_VIEW'
            ? pages[Math.floor(Math.random() * pages.length)]
            : buttons[Math.floor(Math.random() * buttons.length)];

        await prisma.analyticsEvent.create({
            data: {
                type,
                target,
                ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
                browser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000))
            }
        });
    }

    console.log('Analytics seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
