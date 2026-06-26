"use client";

// Inline SVG logos for each tool
const TOOLS: { name: string; svg: React.ReactNode }[] = [
    {
        name: "Microsoft Azure",
        svg: (
            <svg viewBox="0 0 96 96" className="w-8 h-8">
                <defs>
                    <linearGradient id="az1" x1="0.114" y1="47.401" x2="-9.64" y2="23.425" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#114a8b" />
                        <stop offset="1" stopColor="#0669bc" />
                    </linearGradient>
                    <linearGradient id="az2" x1="40.443" y1="51.188" x2="38.234" y2="52.005" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopOpacity=".3" />
                        <stop offset=".071" stopOpacity=".2" />
                        <stop offset=".321" stopOpacity=".1" />
                        <stop offset=".623" stopOpacity=".05" />
                        <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="az3" x1="28.073" y1="1.353" x2="15.056" y2="49.931" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#3ccbf4" />
                        <stop offset="1" stopColor="#2892df" />
                    </linearGradient>
                </defs>
                <path d="M33.338 6.544h26.038L33.074 89.456a4.15 4.15 0 01-3.933 2.825H8.149a4.15 4.15 0 01-3.928-5.482l24.252-71.906a4.15 4.15 0 013.865-2.349z" fill="url(#az1)" />
                <path d="M71.175 60.261H29.311a1.911 1.911 0 00-1.305 3.309l27.065 25.249a4.171 4.171 0 002.852 1.126H81.24z" fill="url(#az2)" />
                <path d="M33.338 6.544a4.12 4.12 0 00-3.878 2.7L4.279 86.703a4.14 4.14 0 003.87 5.578h20.7a4.44 4.44 0 003.397-2.75l4.987-14.671 17.458 16.328a4.24 4.24 0 002.664.943h23.244l-10.205-29.119-29.7.007 18.06-56.475z" fill="url(#az3)" />
            </svg>
        ),
    },
    {
        name: "Dynamics 365",
        svg: (
            <svg viewBox="0 0 256 256" className="w-8 h-8">
                <rect width="110" height="110" rx="12" fill="#0078D4" />
                <rect x="146" width="110" height="110" rx="12" fill="#50E6FF" />
                <rect y="146" width="110" height="110" rx="12" fill="#0078D4" opacity=".7" />
                <rect x="146" y="146" width="110" height="110" rx="12" fill="#50E6FF" opacity=".7" />
            </svg>
        ),
    },
    {
        name: "SAP S/4HANA",
        svg: (
            <svg viewBox="0 0 64 64" className="w-8 h-8">
                <rect width="64" height="64" rx="8" fill="#008FD3" />
                <text x="8" y="44" fontSize="22" fontWeight="900" fill="white" fontFamily="Arial,sans-serif">SAP</text>
            </svg>
        ),
    },
    {
        name: "Microsoft 365",
        svg: (
            <svg viewBox="0 0 256 256" className="w-8 h-8">
                <rect width="110" height="110" rx="12" fill="#EA3E23" />
                <rect x="146" width="110" height="110" rx="12" fill="#7FBA00" />
                <rect y="146" width="110" height="110" rx="12" fill="#00A4EF" />
                <rect x="146" y="146" width="110" height="110" rx="12" fill="#FFB900" />
            </svg>
        ),
    },
    {
        name: "SharePoint",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <circle cx="30" cy="18" r="13" fill="#036C70" />
                <circle cx="18" cy="30" r="15" fill="#1A9BA1" />
                <circle cx="12" cy="12" r="9" fill="#37C6D0" />
                <rect x="0" y="21" width="36" height="27" rx="3" fill="white" opacity=".15" />
            </svg>
        ),
    },
    {
        name: "Power Platform",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <defs>
                    <linearGradient id="pp1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#7B2FF7" />
                        <stop offset="1" stopColor="#B362F5" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#pp1)" />
                <polygon points="24,8 38,24 30,24 30,40 18,40 18,24 10,24" fill="white" />
            </svg>
        ),
    },
    {
        name: "Azure OpenAI",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <defs>
                    <linearGradient id="oai" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00BFFF" />
                        <stop offset="1" stopColor="#0078D4" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#oai)" />
                <path d="M24 10 L32 18 L28 18 L28 30 L20 30 L20 18 L16 18 Z" fill="white" opacity=".9" />
                <circle cx="24" cy="34" r="3" fill="white" opacity=".9" />
            </svg>
        ),
    },
    {
        name: "Microsoft Teams",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <rect width="48" height="48" rx="10" fill="#5059C9" />
                <circle cx="33" cy="15" r="6" fill="white" />
                <path d="M33 23c5 0 9 3.5 9 8v3H24v-3c0-4.5 4-8 9-8z" fill="white" opacity=".85" />
                <circle cx="19" cy="17" r="7" fill="#7B83EB" />
                <path d="M19 27c-6 0-11 4-11 9v3h22v-3c0-5-5-9-11-9z" fill="#7B83EB" />
            </svg>
        ),
    },
    {
        name: "Oracle",
        svg: (
            <svg viewBox="0 0 64 32" className="w-10 h-5">
                <rect width="64" height="32" rx="16" fill="#F80000" />
                <rect x="8" y="8" width="16" height="16" rx="8" fill="white" />
                <rect x="40" y="8" width="16" height="16" rx="8" fill="white" />
            </svg>
        ),
    },
    {
        name: "Salesforce",
        svg: (
            <svg viewBox="0 0 80 52" className="w-10 h-7">
                <path d="M33 4c3.2-3.4 7.6-5.5 12.5-5.5 6.5 0 12.2 3.7 15.2 9.2C62.5 6.6 65 6 67.7 6c7 0 12.3 5.5 12.3 12.5S74.7 31 67.7 31H11.5C5.1 31 0 25.7 0 19c0-6.2 4.6-11.2 10.5-11.9C12.2 3 17.2 0 23 0c4.1 0 7.8 1.6 10.5 4z" fill="#00A1E0" />
            </svg>
        ),
    },
    {
        name: "Power BI",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <rect width="48" height="48" rx="8" fill="#F2C811" />
                <rect x="10" y="24" width="8" height="18" rx="2" fill="#2D2D2D" />
                <rect x="20" y="16" width="8" height="26" rx="2" fill="#2D2D2D" opacity=".8" />
                <rect x="30" y="8" width="8" height="34" rx="2" fill="#2D2D2D" opacity=".6" />
            </svg>
        ),
    },
    {
        name: "Qlik Sense",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <rect width="48" height="48" rx="24" fill="#009845" />
                <circle cx="24" cy="24" r="10" fill="none" stroke="white" strokeWidth="4" />
                <line x1="31" y1="31" x2="40" y2="40" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "GitHub Copilot",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <rect width="48" height="48" rx="10" fill="#24292E" />
                <circle cx="24" cy="20" r="9" fill="white" />
                <circle cx="20" cy="18" r="2.5" fill="#24292E" />
                <circle cx="28" cy="18" r="2.5" fill="#24292E" />
                <path d="M18 28c0 5 12 5 12 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M15 32c-3 2-3 8 9 8s12-6 9-8" fill="white" />
            </svg>
        ),
    },
    {
        name: "Azure DevOps",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <defs>
                    <linearGradient id="ado" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#0078D4" />
                        <stop offset="1" stopColor="#50E6FF" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#ado)" />
                <path d="M38 14L26 8v8L14 20v18l10 4v-8l14-6z" fill="white" />
            </svg>
        ),
    },
    {
        name: "Cosmos DB",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <defs>
                    <linearGradient id="cdb" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#0078D4" />
                        <stop offset="1" stopColor="#004E8C" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#cdb)" />
                <ellipse cx="24" cy="24" rx="14" ry="6" fill="none" stroke="white" strokeWidth="2" />
                <ellipse cx="24" cy="24" rx="6" ry="14" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="24" cy="24" r="3" fill="#50E6FF" />
            </svg>
        ),
    },
    {
        name: "Power Automate",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <defs>
                    <linearGradient id="pa" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#0066FF" />
                        <stop offset="1" stopColor="#00B4EF" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#pa)" />
                <path d="M26 8L14 26h10l-2 14 16-20H28z" fill="white" />
            </svg>
        ),
    },
    {
        name: "Logic Apps",
        svg: (
            <svg viewBox="0 0 48 48" className="w-8 h-8">
                <defs>
                    <linearGradient id="la" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#9B59B6" />
                        <stop offset="1" stopColor="#6C3483" />
                    </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#la)" />
                <circle cx="12" cy="24" r="4" fill="white" />
                <circle cx="36" cy="24" r="4" fill="white" />
                <circle cx="24" cy="12" r="4" fill="white" />
                <circle cx="24" cy="36" r="4" fill="white" />
                <line x1="16" y1="24" x2="32" y2="24" stroke="white" strokeWidth="2" />
                <line x1="24" y1="16" x2="24" y2="32" stroke="white" strokeWidth="2" />
            </svg>
        ),
    },
];

// Duplicate for seamless infinite loop
const TRACK = [...TOOLS, ...TOOLS];

export default function ToolsCarousel() {
    return (
        <section className="py-14 bg-[#F8FAF8] border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#4A5D4E] mb-1">Ecosystem</p>
                    <h3 className="text-2xl font-bold text-[#2D312E] tracking-tight">Built on the platforms you already use</h3>
                </div>
                <span className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    {TOOLS.length} integrations
                </span>
            </div>

            {/* Marquee wrapper */}
            <div className="relative">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAF8] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAF8] to-transparent z-10 pointer-events-none" />

                <div
                    className="flex items-center gap-4"
                    style={{ animation: "tools-marquee 36s linear infinite", width: "max-content" }}
                >
                    {TRACK.map((tool, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-5 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9">
                                {tool.svg}
                            </div>
                            <span className="text-sm font-semibold text-[#2D312E] whitespace-nowrap pr-1">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
