
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import ChatInterface from "./ChatBot";

export default function FloatingAvatar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[100]">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-light-blue/30 bg-black/50 backdrop-blur-xl shadow-[0_0_30px_rgba(135,206,235,0.3)] group cursor-pointer"
                >
                    <Image
                        src="/alpha-bot.png"
                        alt="Alpha Bot"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Pulsing Ring */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-light-blue"
                    />
                </motion.button>

                {/* Status Indicator */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute -top-12 right-0 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg tracking-widest uppercase pointer-events-none"
                    >
                        How can I help you?
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-28 right-8 z-[100] w-[320px] md:w-[360px] h-[480px]"
                    >
                        <ChatInterface onClose={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
