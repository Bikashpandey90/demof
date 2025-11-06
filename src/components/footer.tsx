"use client"

import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#FF8000] text-white relative overflow -z-10">
            <div className="bg-[url('/paper-bg.png')] bg-cover bg-center  sm:bg-cover flex items-center justify-center translate-y-[-50px] -z-10 py-20 sm:py-12">
                <img
                    src="/betteroff.png"
                    className="h-[100%] w-[100%] sm:h-[80%] sm:w-[80%] p-4 sm:p-16 md:p-32 self-center justify-self-center"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-20">
                {/* Top section - Links and social */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="md:col-span-2">
                        <nav className="flex flex-wrap gap-4 sm:gap-6 text-base sm:text-lg md:text-xl leading-6 sm:leading-7 font-gothic font-bold">
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Terms & Conditions
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Privacy
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Cookie policy
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Prize Draw
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Contact
                            </a>
                            <a href="#" className="hover:opacity-80 transition-opacity">
                                Modern Slavery Statement
                            </a>
                        </nav>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between md:justify-normal items-start sm:items-center md:items-end gap-4 sm:gap-6">
                        <div className="flex items-center">
                            <p className="text-base sm:text-lg md:text-xl leading-6 sm:leading-7 mb-0 sm:mb-4 font-gothic font-bold">
                                Connect with us
                            </p>
                        </div>
                        <div
                            className={`flex items-center justify-start sm:justify-end gap-4 sm:gap-6 transition-all duration-300 opacity-100`}
                            style={{
                                transitionDelay: "500ms",
                            }}
                        >
                            <a
                                href="#"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Company info */}
                <div className="mb-4 font-gothic font-bold text-sm sm:text-base leading-5 sm:leading-6">
                    <p className="font-bold mb">Symington's Ltd</p>
                    <p className="text-sm sm:text-base">(part of Princes Limited)</p>
                    <p className="text-sm sm:text-base">Thornes Farm Business Park,</p>
                    <p className="text-sm sm:text-base">Pontefract Lane,</p>
                    <p className="text-sm sm:text-base">Leeds,</p>
                    <p className="text-sm sm:text-base mb">LS9 0DN</p>

                    <p className="text-sm sm:text-base">
                        Princes Limited, Royal Liver Building, Pier Head, Liverpool, L3 1NX, UK. Registered company number 02328824
                    </p>
                </div>

                {/* Cookie preferences */}
                <button className="hover:opacity-80 mb-6 sm:mb-8 transition-opacity font-gothic font-bold text-sm sm:text-base leading-5 sm:leading-6">
                    Update cookies preferences
                </button>
            </div>
        </footer>
    )
}
