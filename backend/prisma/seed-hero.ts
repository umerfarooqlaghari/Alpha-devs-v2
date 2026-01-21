import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding hero slides...');

  // Check if slides already exist
  const existingSlides = await prisma.heroSlide.findMany();
  
  if (existingSlides.length > 0) {
    console.log('✅ Hero slides already exist');
    return;
  }

  // Create default hero slides
  const slides = [
    {
      order: 0,
      topCaption: 'WE ARE',
      badge: 'Service-Based Solutions',
      title: 'CREATIVE',
      description: 'We build cutting-edge web applications, AI solutions, and analytics platforms that drive business growth and innovation.',
      sliderText: 'Alpha-devs',
      imageUrl: '/images/hero-dev.svg',
      isActive: true,
    },
    {
      order: 1,
      topCaption: 'WE ARE',
      badge: 'Data Intelligence',
      title: 'INNOVATIVE',
      description: 'Powerful analytics platform that transforms your data into actionable insights for smarter decision-making.',
      sliderText: 'Alpha-analytics',
      imageUrl: '/images/hero-analytics.svg',
      isActive: true,
    },
    {
      order: 2,
      topCaption: 'WE ARE',
      badge: 'AI Technology',
      title: 'FUTURISTIC',
      description: 'State-of-the-art AI voice cloning technology that creates natural, human-like voice synthesis.',
      sliderText: 'AI Voice Cloner',
      imageUrl: '/images/hero-voice.svg',
      isActive: true,
    },
  ];

  for (const slide of slides) {
    await prisma.heroSlide.create({
      data: slide,
    });
  }

  console.log('✅ Created 3 default hero slides');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding hero slides:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

