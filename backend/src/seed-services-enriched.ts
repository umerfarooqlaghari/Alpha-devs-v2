
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesToSeed = [
    {
        title: "AI Automation & Workflows",
        slug: "ai-automation-workflows",
        description: "Scale your operations with intelligent robotic process automation (RPA) and LLM-driven complex business logic.",
        keywords: ["Intelligent Automation", "RPA", "LLMs", "Operational Efficiency", "Business Process Mapping"],
        heroTitle: "Intelligent Workflows for the Modern Enterprise",
        heroSubtitle: "Automation",
        heroDescription: "We bridge the gap between complex manual processes and autonomous digital operations using custom LLM pipelines and predictive modeling.",
        features: ["Custom LLM Integration", "Automated Decision Engines", "Predictive Process Mapping", "End-to-End RPA Implementation"],
        infoCards: [
            { title: "24/7 Autonomy", description: "Our agents work around the clock with zero downtime and perfect accuracy.", tag: "Efficiency", order: 0 },
            { title: "Zero Error Rate", description: "Eliminate human error in critical data processing and administrative tasks.", tag: "Precision", order: 1 },
            { title: "Rapid ROI", description: "Most clients see significant operational savings within the first quarter.", tag: "Growth", order: 2 }
        ],
        contentBlocks: [
            { type: "heading", content: "Cognitive Automation Defined", style: { fontSize: "48px", bold: true, color: "#000000" }, order: 0 },
            { type: "text", content: "We don't just build scripts; we build cognitive systems that learn from your data. Our solutions integrate directly with your existing ERP and CRM systems to provide a seamless intelligence layer across your entire stack.", style: { fontSize: "18px", color: "#4B5563" }, order: 1 }
        ]
    },
    {
        title: "Computer Vision & ML",
        slug: "computer-vision-ml",
        description: "Advanced deep learning models for real-time video analysis, object detection, and predictive maintenance.",
        keywords: ["Object Detection", "Image Recognition", "Neural Networks", "Anomaly Detection", "Deep Learning"],
        heroTitle: "Visual Intelligence at Scale",
        heroSubtitle: "Machine Vision",
        heroDescription: "Transforming pixels into actionable insights. We build custom neural networks that perceive the world with superhuman precision.",
        features: ["Real-time Object Detection", "Visual Quality Control", "PPE & Safety Monitoring", "Medical Imaging Analysis"],
        infoCards: [
            { title: "Real-time Edge", description: "Deploy models on-premise or in the cloud with sub-50ms latency.", tag: "Speed", order: 0 },
            { title: "99.9% Accuracy", description: "Industry-leading precision in object classification and tracking.", tag: "Quality", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Seeing Beyond the Surface", style: { fontSize: "40px", bold: true }, order: 0 },
            { type: "text", content: "Our computer vision solutions are used in manufacturing, healthcare, and retail to automate monitoring and provide real-time alerts for critical events.", order: 1 }
        ]
    },
    {
        title: "Website Development",
        slug: "website-development",
        description: "High-performance, SEO-optimized web experiences built with Next.js and React for maximum conversion.",
        keywords: ["Next.js", "React", "SEO Optimization", "Performance", "Web Vitals"],
        heroTitle: "Experiences That Convert",
        heroSubtitle: "Web Engineering",
        heroDescription: "We don't just build websites; we build high-performance digital engines that drive revenue and brand authority.",
        features: ["Core Web Vitals Optimization", "Serverless Architecture", "Headless CMS Integration", "Responsive Fluid Design"],
        infoCards: [
            { title: "100 Lighthouse Score", description: "We prioritize performance, accessibility, and SEO best practices.", tag: "Performance", order: 0 },
            { title: "Secure by Design", description: "Built on modern stacks with a focus on zero-trust and speed.", tag: "Security", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "The Future of Web", order: 0 },
            { type: "text", content: "Leveraging the power of Next.js 14+ and Tailwind CSS, we deliver pixel-perfect interfaces that feel fluid across all devices.", order: 1 }
        ]
    },
    {
        title: "Application Development",
        slug: "application-development",
        description: "Robust cross-platform mobile and desktop applications for enterprise-grade performance and scalability.",
        keywords: ["Mobile Apps", "Cross-Platform", "Scalable Architecture", "Microservices", "UX Design"],
        heroTitle: "Native Performance, Global Scale",
        heroSubtitle: "App Development",
        heroDescription: "From mobile-first startups to enterprise portals, we build software that people love to use.",
        features: ["React Native & Flutter", "Microservices Backend", "Real-time Syncing", "offline-first Capability"],
        infoCards: [
            { title: "Seamless Experience", description: "Consistent UI/UX across iOS, Android, and Desktop environments.", tag: "Design", order: 0 },
            { title: "Cloud Native", description: "Architected for infinite horizontal scaling on modern infrastructure.", tag: "Scalability", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Built for Enterprise", order: 0 },
            { type: "text", content: "Our applications are designed to handle millions of transactions with perfect data integrity and security.", order: 1 }
        ]
    },
    {
        title: "Cloud Infrastructure",
        slug: "cloud-infrastructure",
        description: "Scalable cloud solutions, Kubernetes orchestration, and DevOps automation for 99.99% uptime.",
        keywords: ["AWS", "Azure", "Kubernetes", "DevOps", "CI/CD", "Serverless"],
        heroTitle: "Uptime That Never Sleeps",
        heroSubtitle: "Cloud & Devops",
        heroDescription: "Infrastructure that scales with your ambition. We design resilient, cost-effective cloud architectures for the modern global enterprise.",
        features: ["Auto-scaling Clusters", "Disaster Recovery", "Infrastructure as Code", "Cost Optimization"],
        infoCards: [
            { title: "99.99% Uptime", description: "Enterprise-grade reliability for critical business applications.", tag: "Uptime", order: 0 },
            { title: "Global Reach", description: "Deploy anywhere with edge optimization and multi-region redundancy.", tag: "Global", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Architected for Scale", order: 0 },
            { type: "text", content: "We leverage Terraform, AWS, and Kubernetes to build self-healing systems that managed themselves so you don't have to.", order: 1 }
        ]
    },
    {
        title: "Cyber Security",
        slug: "cyber-security",
        description: "Comprehensive security audits, penetration testing, and zero-trust implementation for complete data protection.",
        keywords: ["Penetration Testing", "Zero Trust", "Threat Detection", "Encryption", "SOC 2 Compliance"],
        heroTitle: "Zero Trust, Infinite Security",
        heroSubtitle: "Cyber Defense",
        heroDescription: "Protecting your digital fortress. We identify vulnerabilities before attackers do, ensuring your data stays yours.",
        features: ["Penetration Testing", "Vulnerability Assessment", "Incident Response", "Identity Management"],
        infoCards: [
            { title: "Certified Defense", description: "Expertise in SOC2, ISO 27001, and HIPAA compliance standards.", tag: "Certified", order: 0 },
            { title: "Real-time Monitoring", description: "24/7 endpoint protection and threat intelligence integration.", tag: "Protection", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "The Alpha Shield", order: 0 },
            { type: "text", content: "Security is not a product, but a process. We implement layered security protocols that evolve as quickly as the threats.", order: 1 }
        ]
    },
    {
        title: "Data Engineering",
        slug: "data-engineering",
        description: "Transform raw data into strategic assets with high-performance ETL pipelines and real-time analytics dashboards.",
        keywords: ["Big Data", "ETL Pipelines", "Data Warehouse", "Snowflake", "Databricks", "Analytics"],
        heroTitle: "Turn Data into Strategy",
        heroSubtitle: "Data Intelligence",
        heroDescription: "Information is noise without engineering. We build the pipelines that turn raw chaos into actionable business intelligence.",
        features: ["Real-time Data Streaming", "Data Lake Architecture", "Predictive Modeling Pipelines", "Master Data Management"],
        infoCards: [
            { title: "Actionable Insights", description: "Unlock the value hidden in your legacy data stores.", tag: "Insights", order: 0 },
            { title: "Fast Delivery", description: "Automated pipelines that deliver data when decisions are made, not after.", tag: "Velocity", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Precision Pipelines", order: 0 },
            { type: "text", content: "We specialize in modern data stacks like Snowflake, dbt, and Airflow to ensure your data is clean, reliable, and fast.", order: 1 }
        ]
    },
    {
        title: "E-commerce Development",
        slug: "e-commerce-development",
        description: "Highly scalable, conversion-focused online stores built on Shopify, WooCommerce, or custom headless architectures.",
        keywords: ["Shopify", "Headless E-commerce", "Payment Gateways", "UX/UI", "Conversion Rate Optimization"],
        heroTitle: "Build a Digital Flagship",
        heroSubtitle: "Commerce",
        heroDescription: "A great store is an experience. We build fast, high-converting e-commerce sites that turn visitors into loyal customers.",
        features: ["Headless Commerce", "Omnichannel Integration", "Custom API Integrations", "Advanced Analytics"],
        infoCards: [
            { title: "30% More Conversion", description: "Data-driven UI/UX design focused on the path to purchase.", tag: "Growth", order: 0 },
            { title: "Global Payments", description: "Multi-currency and secure gateway integrations for world-wide reach.", tag: "Payments", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Scale Your Sales", order: 0 },
            { type: "text", content: "From custom Shopify themes to complex React-based storefronts, we deliver the performance needed to compete at the top.", order: 1 }
        ]
    },
    {
        title: "Digital Marketing & Design",
        slug: "digital-marketing-design",
        description: "Strategic brand identity, premium UI/UX design, and SEO-driven growth marketing for market dominance.",
        keywords: ["Brand Identity", "UI/UX Design", "SEO Strategy", "Social Media", "Content Marketing"],
        heroTitle: "Brands That Command Attention",
        heroSubtitle: "Creative & Growth",
        heroDescription: "Design is how it works, not just how it looks. We combine aesthetics with strategy to build brands that lead.",
        features: ["Premium UI/UX Design", "SEO-Driven Growth", "Social Media Strategy", "Content Production"],
        infoCards: [
            { title: "Visual Excellence", description: "Stand out in a crowded market with unique, high-end aesthetics.", tag: "Design", order: 0 },
            { title: "Measurable Results", description: "Marketing campaigns backed by deep data analysis and ROI tracking.", tag: "Results", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Creative Intelligence", order: 0 },
            { type: "text", content: "Our design team works alongside engineers to ensure your brand's digital presence is as powerful as the tech behind it.", order: 1 }
        ]
    },
    {
        title: "Dynamics & ERP Solutions",
        slug: "dynamics-erp-solutions",
        description: "Custom Microsoft Dynamics 365 implementation and enterprise resource planning for streamlined operations.",
        keywords: ["Dynamics 365", "ERP Implementation", "Business Central", "Process Optimization", "Automated Reporting"],
        heroTitle: "Unified Enterprise Intelligence",
        heroSubtitle: "Dynamics & ERP",
        heroDescription: "Connected data, smarter decisions. We implement and customize Microsoft Dynamics 365 to centralize your operations and drive growth.",
        features: ["Dynamics 365 Implementation", "Custom ERP Workflows", "Business Central Migration", "Financial Reporting Automation"],
        infoCards: [
            { title: "Unified Operations", description: "Break down data silos with a single source of truth for your entire business.", tag: "Unified", order: 0 },
            { title: "Seamless Integration", description: "Connect with your existing Microsoft stack and third-party APIs.", tag: "Integration", order: 1 }
        ],
        contentBlocks: [
            { type: "heading", content: "Enterprise Control", order: 0 },
            { type: "text", content: "We help enterprises leverage the full power of Microsoft Dynamics to automate finance, sales, and supply chain management.", order: 1 }
        ]
    }
];

async function main() {
    console.log('Start seeding full 9-service enriched portfolio...');

    // Delete existing relations first to avoid orphans if seeds are re-run
    await prisma.serviceInfoCard.deleteMany({});
    await prisma.serviceContentBlock.deleteMany({});
    await prisma.service.deleteMany({});

    for (const [index, service] of servicesToSeed.entries()) {
        const { infoCards, contentBlocks, ...serviceData } = service;

        const createdService = await prisma.service.create({
            data: {
                ...serviceData,
                order: index,
                videoUrl: `https://cdn.pixabay.com/video/2021/04/12/70860-537335969_tiny.mp4`, // Generic for seed
                infoCards: {
                    create: infoCards
                },
                contentBlocks: {
                    create: contentBlocks
                }
            },
        });
        console.log(`Created enriched service: ${createdService.title}`);
    }

    console.log('Full portfolio seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
