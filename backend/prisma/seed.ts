import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = 'admin@alpha-devs.com';
  const adminPassword = 'admin123'; // Change this in production!

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
        role: 'SUPER_ADMIN',
      },
    });

    console.log('✅ Created admin user:', admin.email);
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('⚠️  Please change the password after first login!');
  }

  // Create sample contact
  const sampleContact = await prisma.contact.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Inquiry about Alpha-analytics',
      message: 'I would like to know more about your analytics product.',
      status: 'PENDING',
    },
  });

  console.log('✅ Created sample contact:', sampleContact.id);

  // Create sample trial request
  const sampleTrial = await prisma.trial.create({
    data: {
      email: 'jane@example.com',
      product: 'Alpha-analytics',
      fullName: 'Jane Smith',
      company: 'Tech Corp',
      status: 'PENDING',
      trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    },
  });

  console.log('✅ Created sample trial request:', sampleTrial.id);

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

