"use client"

import { useEffect } from "react"

import { Instagram, Facebook, Twitter } from "lucide-react"
import { NavLink } from "react-router-dom"

interface AnimatedMenuProps {
    isOpen: boolean
    onClose: () => void
}

export default function AnimatedMenu({ isOpen, onClose }: AnimatedMenuProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const menuItems = [
        { label: "HOME", href: "#" },
        { label: "OUR RANGE", href: "#" },
        { label: "STOCKISTS", href: "#" },
        { label: "ABOUT US", href: "#" },
        { label: "GET IN TOUCH", href: "#" },
    ]

    return (
        <>
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                style={{
                    background: isOpen ? "rgba(0, 0, 0, 0.5)" : "transparent",
                }}
            />

            <div
                className={`fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
                    }`}
            >
                <div
                    className={`absolute inset-0 transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    style={{
                        background: "#FF8000",
                    }}
                />

                <div
                    className={`absolute top-4 left-4 md:top-8 md:left-8 transition-all duration-500 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        }`}
                    style={{
                        transitionDelay: isOpen ? "150ms" : "0ms",
                    }}
                >
                    <div className="w-20 h-20 ml-2 sm:ml-10 md:w-40 md:h-40 mt-6 lg:w-[200px] lg:h-[200px] z-30 rounded-full flex items-center">
                        <img src="/mugshotlogo.png" alt="Mug shot logo" />
                    </div>
                </div>

                <div className="fixed inset-0 flex justify-center">
                    <img
                        src="/smoosh-menu.svg"
                        className="absolute top-0 w-3/4 md:w-[60%] mt-6 md:mt-10  self-center items-center hidden lg:flex"
                    />
                </div>

                <div
                    className={`relative z-10 transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
                        }`}
                    style={{
                        transitionDelay: isOpen ? "200ms" : "0ms",
                    }}
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center px-4">
                        <div className="relative z-10 flex flex-col items-center justify-center space-y-4 md:space-y-6">
                            <nav className="flex flex-col items-center space-y-2 md:space-y-4">
                                {menuItems.map((item, index) => (
                                    <NavLink
                                        key={item.href}
                                        to={item.href}
                                        className={`text-white text-center font-bold font-gothic text-5xl md:text-5xl lg:text-6xl leading-tight md:leading-[56px] transition-all duration-300 hover:scale-110 hover:text-[#C6211D] ${isOpen ? "opacity-100" : "opacity-0"
                                            }`}
                                        style={{
                                            transitionDelay: isOpen ? `${300 + index * 50}ms` : "0ms",
                                        }}
                                        onClick={onClose}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>

                            <div
                                className={`flex items-center justify-center gap-3 md:gap-6 mt-8 md:mt-20 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{
                                    transitionDelay: isOpen ? "500ms" : "0ms",
                                }}
                            >
                                <a
                                    href="#"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors hover:scale-110"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5 md:w-6 md:h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
