import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    {
        name: "AI-Powered ERP",
        tagline: "Smart Insights, Instant Answers.",
        category: "Artificial Intelligence",
        description: "Transform how your business interacts with data through an intelligent chat interface and real-time forecasting.",
        features: [
            "Intelligent ERP Chat Interface",
            "Real-Time Forecasting",
            "Database-Level Integration",
            "Multi-Platform Access"
        ],
        imageUrl: "/1.png",
        order: 1
    },
    {
        name: "Computer Vision",
        tagline: "Smart Monitoring. Instant Alerts.",
        category: "Computer Vision",
        description: "Automate workplace monitoring to detect SOP violations, compliance breaches, and unsafe behavior in real-time.",
        features: [
            "SOP Violation Detection",
            "AWS-Optimized Architecture",
            "Multi-Branch Support",
            "Secure & Private Design"
        ],
        imageUrl: "/2.png",
        order: 2
    },
    {
        name: "Sales Scheduler",
        tagline: "Eliminate Manual Paperwork.",
        category: "Software as a Service",
        description: "A mobile application for pharmaceutical teams to automate field sales and order placement processes.",
        features: [
            "Smart Order Placement",
            "Real-Time Notifications",
            "Multi-Level Dashboard",
            "Efficient CRM Tracking"
        ],
        imageUrl: "/next.svg",
        order: 3
    },
    {
        name: "Alpha Survey",
        tagline: "Dynamic Multi-Tenant Surveys.",
        category: "Software as a Service",
        description: "A comprehensive platform for creating dynamic forms and surveys with robust backend analytics.",
        features: [
            "Interactive Form Builder",
            "Real-Time Analytics",
            "Role-Based Access Control",
            "Custom Admin Dashboard"
        ],
        imageUrl: "/window.svg",
        order: 4
    },
    {
        name: "Mentore Ed-Tech",
        tagline: "Skills Development & Collaboration.",
        category: "Education Technology",
        description: "An educational platform designed for professional skills development and social collaboration.",
        features: [
            "Dynamic Course Builder",
            "Assessment & Quiz System",
            "Real-Time Progress Tracking",
            "Social Collaboration"
        ],
        imageUrl: "/globe.svg",
        order: 5
    }
];

async function main() {
    console.log('Seeding products...');
    for (const product of products) {
        await prisma.product.create({
            data: product
        });
    }
    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
