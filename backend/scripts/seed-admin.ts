import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'umer.farooq@alpha-devs.cloud';
    const password = '132Careras@!';
    const name = 'Umer Farooq';
    const role = UserRole.ADMIN;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log(`User ${email} already exists. Updating password...`);
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword, role },
        });
        console.log(`✓ Password updated for ${email}`);
    } else {
        console.log(`Creating new admin user: ${email}`);
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
        });
        console.log(`✓ Admin user created: ${email}`);
    }
}

main()
    .catch((e) => {
        console.error('Error seeding admin user:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
