export default function ImpactSection() {
    return (
        <section className="bg-cream py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

                {/* Left: Typography */}
                <div className="w-full md:w-1/2">
                    <span className="text-sm font-bold tracking-widest uppercase text-dark-navy/40 mb-4 block">
                        Environmental Impact
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-dark-navy">
                        A 40% lower carbon footprint.
                    </h2>
                    <p className="text-lg text-dark-navy/70 mb-8 max-w-lg">
                        Compared to traditional poly-coated paper and plastic alternatives. Nfinite is designed for the circular economy.
                    </p>
                    <button className="text-dark-navy border-b border-dark-navy/20 pb-1 hover:border-dark-navy transition-colors font-bold text-lg">
                        Read the Life Cycle Assessment →
                    </button>
                </div>

                {/* Right: Orbital Animation Representation */}
                <div className="w-full md:w-1/2 relative h-[400px] flex items-center justify-center">
                    {/* 
                Simulating the orbital diagram with CSS circles. 
             */}
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
                        {/* Center Core */}
                        <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-2xl z-20 flex items-center justify-center border border-gray-100">
                            <span className="text-3xl md:text-5xl font-bold text-dark-navy tracking-tighter">-40%</span>
                        </div>

                        {/* Orbit 1 */}
                        <div className="absolute w-full h-full border border-dark-navy/5 rounded-full animate-spin-slow z-10" style={{ animationDuration: '20s' }}>
                            <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-light-blue rounded-full shadow-lg" />
                        </div>

                        {/* Orbit 2 */}
                        <div className="absolute w-[80%] h-[80%] border border-dark-navy/10 rounded-full animate-spin-reverse-slow z-10" style={{ animationDuration: '25s' }}>
                            <div className="absolute bottom-0 right-1/2 w-6 h-6 bg-[#d4c5b0] rounded-full shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
