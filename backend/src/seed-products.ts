import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    {
        name: "AI-Powered ERP",
        slug: "ai-erp",
        tagline: "Smart Insights, Instant Answers.",
        category: "Artificial Intelligence",
        description: "Transform how your business interacts with data through an intelligent chat interface and real-time forecasting. Our AI-Powered ERP is designed to solve the complexities of modern enterprise management by providing predictive analytics and intuitive conversational AI.",
        heroTitle: "The AI-Powered ERP That Thinks Ahead",
        heroSubtitle: "Autonomous AI ERP",
        heroDescription: "Experience the next generation of enterprise management. Our AI-driven platform optimizes supply chains, forecasts demand with 98% accuracy, and provides instant financial clarity through an intelligent chat interface.",
        features: [
            "Intelligent ERP Chat Interface",
            "Real-Time Forecasting",
            "Database-Level Integration",
            "Multi-Platform Access",
            "Automated Anomaly Detection",
            "Dynamic Resource Allocation"
        ],
        imageUrl: "/products/ai-erp.png",
        order: 1,
        infoCards: {
            create: [
                {
                    title: "Inventory Optimization",
                    description: "Reduce overstock by up to 20% using our industry-leading predictive demand analytics. No more guesswork, just data-driven decisions.",
                    tag: "Supply Chain",
                    order: 1
                },
                {
                    title: "Financial Clarity",
                    description: "Get instant AI-generated cash flow reports and financial summaries via simple chat commands. Real-time insights at your fingertips.",
                    tag: "Finance",
                    order: 2
                },
                {
                    title: "Workforce Intelligence",
                    description: "Optimize labor allocation based on predicted demand spikes and seasonal trends. Enhance productivity across all departments.",
                    tag: "HR",
                    order: 3
                }
            ]
        },
        contentBlocks: {
            create: [
                {
                    type: "heading",
                    content: "Predictive Analytics for Proactive Management",
                    order: 1
                },
                {
                    type: "text",
                    content: "Stop reacting to problems and start preventing them. Our AI ERP analyzes historical data to identify patterns and predict future outcomes, allowing you to stay ahead of the curve. Whether it's supply chain disruptions or market shifts, you'll be prepared.",
                    order: 2
                },
                {
                    type: "heading",
                    content: "Instant Insights via Intelligent Chat",
                    order: 3
                },
                {
                    type: "text",
                    content: "Why navigate complex menus when you can just ask? Our conversational AI interface allows any team member to retrieve critical data, generate reports, and gain insights instantly using natural language. It's like having a data scientist available 24/7.",
                    order: 4
                }
            ]
        }
    },
    {
        name: "Computer Vision",
        slug: "cv-safety",
        tagline: "Smart Monitoring. Instant Alerts.",
        category: "Computer Vision",
        description: "Automate workplace monitoring to detect SOP violations, compliance breaches, and unsafe behavior in real-time. Our computer vision solution acts as an unblinking eye, ensuring safety and efficiency across your entire operation.",
        heroTitle: "Your Eyes for a Safer, Smarter Workspace",
        heroSubtitle: "Real-Time Compliance",
        heroDescription: "Transform your safety protocols with AI-driven vision. Detect PPE violations, monitor exclusion zones, and prevent collisions automatically. Turn your existing camera infrastructure into a proactive safety engine.",
        features: [
            "SOP Violation Detection",
            "PPE Compliance Monitoring",
            "Exclusion Zone Breach Alerts",
            "Collision Avoidance System",
            "Slip & Fall Detection",
            "Secure Edge-AI Architecture"
        ],
        imageUrl: "/products/cv-safety.png",
        order: 2,
        infoCards: {
            create: [
                {
                    title: "Zero-Accident Warehouse",
                    description: "Prevent collisions between forklifts and pedestrians with real-time audio and visual alerts triggered by AI detection.",
                    tag: "Safety",
                    order: 1
                },
                {
                    title: "Strict SOP Adherence",
                    description: "Ensure 100% compliance with safety protocols in high-risk zones. Automatically log and report every violation for audit readiness.",
                    tag: "Compliance",
                    order: 2
                },
                {
                    title: "PPE Detection",
                    description: "Verify that all employees are wearing hard hats, vests, and eyewear before they enter hazardous areas. Real-time enforcement made easy.",
                    tag: "Health & Safety",
                    order: 3
                }
            ]
        },
        contentBlocks: {
            create: [
                {
                    type: "heading",
                    content: "Unmatched Accuracy at the Edge",
                    order: 1
                },
                {
                    type: "text",
                    content: "Our vision models are optimized for speed and accuracy. By processing video at the edge, we ensure ultra-low latency alerts while maintaining complete data privacy. Monitor multiple branches from a single, centralized dashboard with ease.",
                    order: 2
                }
            ]
        }
    },
    {
        name: "Sales Scheduler",
        slug: "pharma-sales",
        tagline: "Eliminate Manual Paperwork.",
        category: "Software as a Service",
        description: "A comprehensive mobile application for pharmaceutical teams to automate field sales, order placement, and HCP engagement. Bridge the gap between field reps and the back office with seamless, real-time data synchronization.",
        heroTitle: "Precision Sales Automation for Modern Pharma",
        heroSubtitle: "Field Force Empowerment",
        heroDescription: "Enable your sales team to work smarter, not harder. Optimize routes, personalize HCP interactions, and capture orders instantly—all from a single, intuitive mobile platform designed for the pharmaceutical industry.",
        features: [
            "GPS-Optimized Route Planning",
            "Smart Order Management",
            "Interactive e-Detailing",
            "HCP Relationship Analytics",
            "Real-Time Inventory Sync",
            "Multi-Level Dashboards"
        ],
        imageUrl: "/products/pharma-sales.png",
        order: 3,
        infoCards: {
            create: [
                {
                    title: "Maximized Rep Efficiency",
                    description: "Rep visited increased by 30% through our intelligent GPS route planning. Spend more time with doctors and less time on the road.",
                    tag: "Productivity",
                    order: 1
                },
                {
                    title: "Precise Detailing",
                    description: "Deliver tailored product presentations based on historical HCP interaction data and preferences. Capture feedback instantly.",
                    tag: "Marketing",
                    order: 2
                },
                {
                    title: "Seamless Order Capture",
                    description: "Place orders directly from the field with real-time stock verification and instant backend synchronization. Eliminate manual errors.",
                    tag: "Sales",
                    order: 3
                }
            ]
        },
        contentBlocks: {
            create: [
                {
                    type: "heading",
                    content: "Closed-Loop Marketing (CLM) Integration",
                    order: 1
                },
                {
                    type: "text",
                    content: "Capture every detail of the HCP interaction. Our platform doesn't just show presentations—it tracks engagement, preferences, and feedback, feeding directly into your marketing strategy for continuous improvement.",
                    order: 2
                }
            ]
        }
    },
    {
        name: "Alpha Survey",
        slug: "alpha-survey",
        tagline: "Dynamic Multi-Tenant Surveys.",
        category: "Software as a Service",
        description: "A robust enterprise-grade platform for creating dynamic forms and surveys with deep backend analytics. Built on a secure multi-tenant architecture, it's the ideal solution for large organizations and SaaS providers.",
        heroTitle: "Scalable Enterprise Surveys for Every Tenant",
        heroSubtitle: "Multi-Tenant Architecture",
        heroDescription: "Deploy powerful survey solutions across multiple organizations from a single instance. Ensure data isolation, deliver white-label experiences, and gain cross-tenant insights with our advanced analytics engine.",
        features: [
            "Secure Multi-Tenant Design",
            "White-Label Customization",
            "Advanced Sentiment Analysis",
            "Role-Based Access Control",
            "Cross-Platform Distribution",
            "Real-Time Analytics Dashboards"
        ],
        imageUrl: "/products/alpha-survey.png",
        order: 4,
        infoCards: {
            create: [
                {
                    title: "Data Isolation & Security",
                    description: "Keep every tenant's data strictly separate and secure. Fully compliant with GDPR and enterprise-grade security standards.",
                    tag: "Security",
                    order: 1
                },
                {
                    title: "Resource Efficiency",
                    description: "Manage thousands of clients from a single infrastructure. Reduce operational costs while maintaining peak performance.",
                    tag: "Operations",
                    order: 2
                },
                {
                    title: "White-Label Branding",
                    description: "Allow your clients to customize surveys with their own logos, colors, and domains. A seamless extension of their brand experience.",
                    tag: "Branding",
                    order: 3
                }
            ]
        },
        contentBlocks: {
            create: [
                {
                    type: "heading",
                    content: "Actionable Insights with AI",
                    order: 1
                },
                {
                    type: "text",
                    content: "Go beyond simple counts. Our platform uses NLP to perform sentiment analysis on open-ended feedback, revealing the true feelings behind the data. Understand 'why' your customers or employees feel the way they do.",
                    order: 2
                }
            ]
        }
    },
    {
        name: "Mentore Ed-Tech",
        slug: "mentore-edtech",
        tagline: "Skills Development & Collaboration.",
        category: "Education Technology",
        description: "Transform your organization into a learning powerhouse. Mentore combines professional skill development with modern social collaboration to close skill gaps and foster a culture of continuous growth.",
        heroTitle: "The Future of Professional Mastery is Social",
        heroSubtitle: "Upskilling & Collaboration",
        heroDescription: "Empower your workforce with personalized learning pathways and a secure community. Mentore bridges the gap between theoretical knowledge and practical mastery through peer-to-peer engagement.",
        features: [
            "AI-Personalized Learning",
            "Integrated Social Hubs",
            "Bite-Sized Microlearning",
            "Peer-to-Peer Mentoring",
            "Progress Tracking & Badges",
            "Industry Certifications"
        ],
        imageUrl: "/products/mentore-edtech.png",
        order: 5,
        infoCards: {
            create: [
                {
                    title: "Continuous Upskilling",
                    description: "Close technical and soft-skill gaps through collaborative labs and peer review cycles. Learning that actually sticks.",
                    tag: "Strategy",
                    order: 1
                },
                {
                    title: "Leadership Mastery",
                    description: "Build a pipeline of future leaders through structured peer-to-peer mentoring programs within a secure digital ecosystem.",
                    tag: "Growth",
                    order: 2
                },
                {
                    title: "Community Intelligence",
                    description: "Leverage the collective wisdom of your organization. Share insights, solve problems, and innovate together in real-time.",
                    tag: "Culture",
                    order: 3
                }
            ]
        },
        contentBlocks: {
            create: [
                {
                    type: "heading",
                    content: "Learning Designed for the Modern Professional",
                    order: 1
                },
                {
                    type: "text",
                    content: "Traditional training is outdated. Mentore focuses on micro-learning units that can be consumed in minutes, reinforced by social interaction and practical application. It's learning tailored for busy schedules.",
                    order: 2
                }
            ]
        }
    }
];

async function main() {
    console.log('Seeding products...');

    // Clear existing data to avoid duplicates if necessary, or use upsert
    // For simplicity in this script, we'll clear dependencies if required or just create
    // But since the request is to "seed the data for all current products", 
    // we should ideally clean up or use a method that doesn't error on re-run.

    await prisma.productInfoCard.deleteMany({});
    await prisma.productContentBlock.deleteMany({});
    await prisma.product.deleteMany({});

    for (const productData of products) {
        await prisma.product.create({
            data: productData
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
