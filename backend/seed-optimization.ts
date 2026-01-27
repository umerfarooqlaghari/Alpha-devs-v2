import prisma from './src/lib/prisma';

async function main() {
    console.log('Seeding Site Optimization Data...');

    const optimizations = [
        {
            pagePath: '*',
            title: 'Alpha Development | AI, Cloud & Computer Vision Experts',
            description: 'Alpha Development provides cutting-edge AI integration, cloud infrastructure, and computer vision solutions for modern enterprises.',
            keywords: 'AI, Cloud Computing, Computer Vision, Software Development, Enterprise Solutions, Digital Transformation',
            ogTitle: 'Alpha Development | Leading Tech Innovation',
            ogDescription: 'Pioneering the future of digital engineering with AI-driven solutions.',
            ogImage: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/og-main.jpg',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Alpha Development",
                "url": "https://alpha-devs.com",
                "logo": "https://alpha-devs.com/logo.png",
                "sameAs": [
                    "https://linkedin.com/company/alpha-devs",
                    "https://twitter.com/alpha_devs"
                ],
                "description": "Enterprise-grade AI and Cloud engineering firm.",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "London",
                    "addressCountry": "UK"
                }
            },
            headerScripts: '<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag("js", new Date());\n  gtag("config", "G-XXXXXXXXXX");\n</script>',
            bodyScripts: '<!-- GTM (noscript) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"\nheight="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
            footerScripts: '<!-- Custom Footer Tracker -->\n<script>console.log("Alpha Devs Analytics Initialized");</script>'
        },
        {
            pagePath: '/',
            title: 'Alpha Development | Beyond Software Engineering',
            description: 'We build autonomous AI pipelines and scalable cloud architectures that drive business efficiency.',
            keywords: 'Home, AI Strategy, Cloud Architecture, Industrial Computer Vision',
            ogTitle: 'Alpha Development Home',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Home",
                "description": "Main landing page for Alpha Development's tech solutions."
            }
        },
        {
            pagePath: '/about',
            title: 'About Alpha Development | Our Team & Vision',
            description: 'Learn about our mission to bring machine intelligence to every industry through expert engineering.',
            keywords: 'About Us, Alpha Team, Mission, Vision, Tech Leadership',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Alpha Development Team",
                    "description": "Specialists in RAG, Serverless, and Edge-AI."
                }
            }
        },
        {
            pagePath: '/services',
            title: 'Our Services | AI, Cloud & Vision Solutions',
            description: 'Explore our specialized services including Cognitive LLM Pipelines, Multi-Cloud Orchestration, and Real-time PPE Detection.',
            keywords: 'AI Services, Cloud Migration, Computer Vision Monitoring, SaaS Architecture',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Software Development & AI Consulting",
                "provider": {
                    "@type": "Organization",
                    "name": "Alpha Development"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Tech Services",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Integration" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Infrastructure" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Computer Vision" } }
                    ]
                }
            }
        },
        {
            pagePath: '/faq',
            title: 'Frequently Asked Questions | Alpha Support',
            description: 'Common questions about our AI, Cloud, and Software development processes.',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is Retrieval-Augmented Generation (RAG)?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "RAG connects AI models to your private business data, ensuring answers are grounded in your specific documents."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do you handle data security?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We implement Zero-Trust architectures and follow SOC 2 compliance standards."
                        }
                    }
                ]
            }
        },
        {
            pagePath: '/consultancy',
            title: 'Technical Consultancy | AI Strategy & Cloud Architecture | Alpha Development',
            description: 'Expert technical consultancy for digital transformation. We provide AI roadmaps, cloud cost optimization, and scalable SaaS architecture design.',
            keywords: 'Tech Consultancy, AI Roadmap, Cloud Strategy, SaaS Design, Technical Audit, CTO Advisory',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "ConsultingService",
                "name": "Technical Strategy & Engineering Consultancy",
                "description": "Providing high-level technical roadmaps and architectural oversight for mid-to-large scale enterprises.",
                "provider": {
                    "@type": "Organization",
                    "name": "Alpha Development"
                }
            }
        },
        {
            pagePath: '/products',
            title: 'AI Products & Solutions | Alpha Intelligence & Alief Wellness',
            description: 'Explore our ecosystem of high-performance products, including Alpha Intelligence analytics and Alief Wellness health-tech solutions.',
            keywords: 'AI Products, Wellness Tech, Data Analytics SaaS, Healthcare Software, Alpha Intelligence, Alief Wellness',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Alpha Development Products",
                "itemListElement": [
                    {
                        "@type": "Product",
                        "name": "Alpha Intelligence",
                        "description": "Advanced predictive analytics for enterprise data."
                    },
                    {
                        "@type": "Product",
                        "name": "Alief Wellness",
                        "description": "AI-driven personalized wellness and health tracking."
                    }
                ]
            }
        },
        {
            pagePath: '/contact',
            title: 'Contact Us | Partner with Alpha Development',
            description: 'Ready to scale? Contact our team for custom AI solutions, cloud infrastructure builds, and software engineering inquiries.',
            keywords: 'Contact, Project Booking, Tech Partnership, Hire Engineers, Alpha Devs Support',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "Alpha Development",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer support",
                        "email": "hello@alpha-devs.com",
                        "url": "https://alpha-devs.com/contact"
                    }
                }
            }
        }
    ];

    for (const opt of optimizations) {
        await prisma.siteOptimization.upsert({
            where: { pagePath: opt.pagePath },
            update: opt,
            create: opt
        });
    }

    console.log('Seed completed successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
