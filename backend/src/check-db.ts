
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    try {
        const eventCount = await prisma.analyticsEvent.count();
        const statCount = await prisma.analyticsStat.count();
        const latestEvents = await prisma.analyticsEvent.findMany({
            take: 5,
            orderBy: { timestamp: 'desc' }
        });

        console.log('--- DATABASE STATUS ---');
        console.log(`AnalyticsEvent count: ${eventCount}`);
        console.log(`AnalyticsStat count: ${statCount}`);
        console.log('Latest 5 events:', JSON.stringify(latestEvents, null, 2));
    } catch (err) {
        console.error('Error checking DB:', err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
