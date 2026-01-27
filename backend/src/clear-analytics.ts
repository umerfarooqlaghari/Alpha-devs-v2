import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Clearing all analytics data...');
    await prisma.analyticsEvent.deleteMany({});
    await prisma.analyticsStat.deleteMany({});
    console.log('Analytics data cleared.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
