
"use client";

export default function ProductStats() {
    const stats = [
        { label: "Happy Clients", value: "250+" },
        { label: "Successful Deployments", value: "600+" },
        { label: "Countries Served", value: "15+" },
        { label: "Uptime Guaranteed", value: "99.9%" },
    ];

    return (
        <section className="py-20 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-bold text-[#2D312E] mb-2 tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
