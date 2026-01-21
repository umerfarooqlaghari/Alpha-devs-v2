
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesToSeed = [
    {
        title: "AI Automation & Workflows",
        keywords: ["Intelligent Automation", "RPA", "Predictive Analytics", "Operational Efficiency", "LLMs"],
        description: "Automate complex business processes with cutting-edge AI flows."
    },
    {
        title: "Computer Vision & ML",
        keywords: ["Image Recognition", "Object Detection", "Neural Networks", "Anomaly Detection", "Deep Learning"],
        description: "Advanced machine learning models for visual data analysis."
    },
    {
        title: "Website Development",
        keywords: ["Next.js", "React", "Responsive Design", "SEO Optimization", "Modern UI/UX"],
        description: "High-performance, seo-optimized web experiences."
    },
    {
        title: "Application Development",
        keywords: ["Mobile Apps", "Cross-Platform", "Scalable Architecture", "Microservices", "Native Performance"],
        description: "Robust mobile and desktop applications for enterprise needs."
    },
    {
        title: "Cloud Infrastructure",
        keywords: ["AWS / Azure", "Kubernetes", "Serverless", "Scalability", "DevOps"],
        description: "Scalable cloud solutions and infrastructure management."
    },
    {
        title: "Cyber Security",
        keywords: ["Penetration Testing", "Threat Detection", "Encryption", "Zero Trust", "Risk Management"],
        description: "Comprehensive security audits and protective measures."
    },
    {
        title: "Data Engineering",
        keywords: ["ETL Pipelines", "Big Data", "Data Warehousing", "Real-time Processing", "Analytics"],
        description: "Transform raw data into actionable insights."
    },
    {
        title: "E-commerce Development",
        keywords: ["Shopify / WooCommerce", "Payment Gateways", "Inventory Management", "Conversion Optimization"],
        description: "End-to-end e-commerce solutions for growth."
    },
    {
        title: "Digital Marketing & Design",
        keywords: ["SEO Strategy", "Brand Identity", "UI/UX Design", "Social Media", "Growth Hacking"],
        description: "Creative design and strategic marketing for brand impact."
    }
];

async function main() {
    console.log('Start seeding services...');

    // tailored to avoid duplicates, we can delete existing or just upsert.
    // For simplicity/safety in this context, let's delete existing services first to avoid duplicates if re-run, 
    // OR we can just create them if the table is empty.
    // Let's go with creating them.

    for (const [index, service] of servicesToSeed.entries()) {
        const createdService = await prisma.service.create({
            data: {
                title: service.title,
                keywords: service.keywords,
                description: service.description,
                videoUrl: null, // As requested
                order: index,
            },
        });
        console.log(`Created service with id: ${createdService.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
