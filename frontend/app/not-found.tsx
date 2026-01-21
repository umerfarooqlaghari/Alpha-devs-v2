
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#121212] overflow-hidden flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-20">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left z-10"
                >
                    <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-tight">
                        Oops!
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-xl mb-12 leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <Link href="/">
                        <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-light-blue hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto md:mx-0 group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Go Back Home
                        </button>
                    </Link>
                </motion.div>

                {/* Right Content - Massive Typography */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 flex items-center justify-center md:justify-end"
                >
                    <div className="relative">
                        <h2 className="text-[12rem] md:text-[22rem] font-black text-white/5 tracking-tighter select-none leading-none">
                            404
                        </h2>
                        <div className="absolute inset-0 flex items-center justify-center md:justify-end">
                            <h2 className="text-[10rem] md:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-transparent tracking-tighter leading-none">
                                404
                            </h2>
                        </div>

                        {/* Subtle floating glow behind text */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.05, 0.1, 0.05]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-light-blue blur-[120px] rounded-full -z-10"
                        />
                    </div>
                </motion.div>
            </div>

            <Footer />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-light-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
        </main>
    );
}
