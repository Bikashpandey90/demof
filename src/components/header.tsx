"use client"

import { useState } from "react"
import HamburgerIcon from "./hamburger"
import AnimatedMenu from "./menu"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky bg-transparent top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                    <div className="w-[200px] h-[200px] my-4 flex items-center justify-center">
                        <img src="/mugshotlogo.png" alt="logo" className="" />
                    </div>
                </div>


                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="sticky  mr-2 z-50 mb-4 hover:opacity-80 transition-opacity"
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
