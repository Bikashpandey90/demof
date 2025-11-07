"use client"

import { useState } from "react"
import HamburgerIcon from "./hamburger"
import AnimatedMenu from "./menu"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="absolute  left-0 top-0 w-full mt-6 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-3 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-[80px] p-2 sm:w-[150px] md:w-[200px] h-auto sm:my-2 flex items-center justify-center">
                        <img
                            src="/momo.png"
                            alt="logo"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Hamburger Button */}

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mr-2 z-50  mb-2 sm:mb-3 md:mb-4 hover:opacity-80 transition-opacity"
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon isOpen={isMenuOpen} />
                </button>

                {/* Menu Overlay */}
                <AnimatedMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </div>
        </header>
    )
}
