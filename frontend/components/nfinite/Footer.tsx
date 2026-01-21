import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-light-blue pt-24 pb-8 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Top CTA Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-black/10 pb-24">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black leading-tight">
                            Get a free consultation
                        </h2>
                        <p className="text-xl text-gray-900/80 mb-8 max-w-xl">
                            Book a discovery call to discuss your digital transformation today.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact?type=booking">
                                <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-900/80">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-3xl font-bold mb-4 block text-black tracking-tighter">
                            Alpha Devs
                        </Link>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-black">Contact</h4>
                        <p>Karachi, Pakistan</p>
                        <p className="mt-2">info@alpha-devs.cloud</p>
                        <p>+92 300 9243063</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-black">Social</h4>
                        <div className="space-y-2 flex flex-col">
                            <Link href="#" className="hover:text-black transition-colors">Upwork</Link>
                            <Link href="#" className="hover:text-black transition-colors">LinkedIn</Link>
                            <Link href="#" className="hover:text-black transition-colors">Instagram</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-xs text-gray-900/50 gap-4">
                    <p>© {new Date().getFullYear()} Alpha Devs. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                        <span className="opacity-50">Made by Numbered</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
