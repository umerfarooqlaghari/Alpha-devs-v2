export default function PerformanceGrid() {
    const specs = [
        { label: "SPEED", value: "Ultra Low", unit: "Latency", description: "< 50ms Response Time" },
        { label: "SCALABILITY", value: "Infinite", unit: "Users", description: "Auto-scaling Cloud Arch" },
        { label: "SECURITY", value: "Ironclad", unit: "Encryption", description: "End-to-End Zero Trust" },
        { label: "RELIABILITY", value: "99.99%", unit: "Uptime", description: "SLA Guaranteed" },
    ];

    return (
        <section className="bg-light-blue py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Uncompromising Performance</h2>
                    <p className="text-lg opacity-70 text-gray-900 max-w-xl">
                        Engineered for high-growth enterprises demanding speed, security, and scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specs.map((spec, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-black hover:scale-105 group cursor-default">
                            <p className="text-xs font-bold tracking-widest text-gray-500 mb-8 group-hover:text-gray-400 transition-colors">{spec.label}</p>
                            <div className="mb-2">
                                <span className="text-4xl font-bold text-black group-hover:text-white transition-colors">{spec.value}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 text-sm group-hover:text-gray-300 transition-colors">
                                <span className="font-semibold block">{spec.description}</span>
                            </div>
                            <p className="border-t border-gray-100 mt-6 pt-4 text-xs font-mono text-gray-400 text-right group-hover:border-gray-800 transition-colors">
                                {spec.unit}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
