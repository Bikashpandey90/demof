"use client"

import type React from "react"

import { useState } from "react"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"

export default function OurRange() {
    const products = [
        { id: 1, name: "Chicken", image: "/products/blue.png", category: "SACHETS" },
        { id: 2, name: "Beef", image: "/products/pink.png", category: "POTS" },
        { id: 3, name: "Prawn", image: "/products/yellow.png", category: "POTS" },
        { id: 4, name: "BBQ", image: "/products/yellow2.png", category: "MIGHTY POTS" },
        { id: 5, name: "Spicy", image: "/products/brown.png", category: "SACHETS" },
        { id: 6, name: "Tomato", image: "/products/purple.png", category: "POTS" },
        { id: 7, name: "Herbs", image: "/products/yellow3.png", category: "MIGHTY POTS" },
        { id: 8, name: "Chicken", image: "/products/blue2.png", category: "SACHETS" },
        { id: 9, name: "Spicy", image: "/products/brown2.png", category: "POTS" },
        { id: 10, name: "Chicken", image: "/products/skyblue.png", category: "MIGHTY POTS" },
        { id: 11, name: "Chicken", image: "/products/lightgreen.png", category: "SACHETS" },
        { id: 12, name: "Chicken", image: "/products/red.png", category: "POTS" },
        { id: 13, name: "Chicken", image: "/products/green.png", category: "MIGHTY POTS" },
    ]

    const categories = ["POTS", "SACHETS", "MIGHTY POTS"]
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Drag logic
    const handleMouseDown = (e: React.MouseEvent) => {
        const slider = sliderRef.current
        if (!slider) return

        slider.classList.add("grabbing")
        const startX = e.pageX - slider.offsetLeft
        const scrollLeft = slider.scrollLeft

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const x = moveEvent.pageX - slider.offsetLeft
            const walk = (x - startX) * 1.5
            slider.scrollLeft = scrollLeft - walk
        }

        const handleMouseUp = () => {
            slider.classList.remove("grabbing")
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
    }

    // Filter products based on selected category
    const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products

    // Close dropdown on click outside
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category)
        setIsDropdownOpen(false)
    }

    return (
        <section className="bg-[#C6211D] py-8 md:py-16 relative overflow-hidden">
            <div className="w-full mx-auto">
                <h2 className="text-5xl md:text-7xl leading-[3rem] md:leading-[6rem] font-bold text-white text-center mb-4 md:mb-8 drop-shadow-lg font-turbinado">
                    Our range
                </h2>

                <p className="text-white text-center text-sm sm:text-lg md:text-2xl mb-3 md:mb-4 font-gothic leading-6 md:leading-9 font-bold px-4">
                    When you're on the go, take time out for a few delicious minutes with Mug Shot, the
                    <br className="hidden sm:block" />
                    warm, comforting, convenient flavour-packed snack.
                </p>

                <p className="text-white text-center text-sm sm:text-lg md:text-2xl mb-8 md:mb-16 font-bold font-gothic leading-6 md:leading-9 px-4">
                    For the perfect pick me up. Wherever you're heading.
                </p>

                <div className="md:hidden px-4 mb-4 relative mx-14 z-20">
                    <div ref={dropdownRef} className="relative ">
                        <button
                            onClick={handleDropdownToggle}
                            style={{
                                boxShadow: `2px 2px 0px #C6211D, 6px 6px 0px #D97706`,
                                borderColor: "#C6211D",
                            }}
                            className="w-full bg-[#FF8000] text-white font-bold text-lg py-2 px-4 rounded-xl border-4 flex items-center justify-between hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-wider"
                        >
                            {selectedCategory || "Select Category"}
                            <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 bg-white rounded-xl mt-2  ">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className={`w-full text-left px-4 py-3 font-bold text-lg transition-colors uppercase tracking-wider ${selectedCategory === category ? "bg-[#FF8000] text-white" : "bg-[#FF8000] text-white hover:bg-gray-100"
                                            } first:rounded-t-xl last:rounded-b-xl`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Draggable product slider */}
                <div
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none pb-6 md:pb-8 mb-8 md:mb-12"
                >
                    <div className="flex gap-4 md:gap-6 px-4 md:px-8 w-max">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="flex flex-col  items-center flex-shrink-0">
                                <div className="w-32 h-48 md:w-[220px] md:h-80 flex items-center justify-center">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="h-48 md:h-80 w-auto pointer-events-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-8">
                    <div className="hidden md:flex justify-center gap-6 md:gap-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                                style={{
                                    boxShadow:
                                        selectedCategory === category
                                            ? `2px 2px 0px #C6211D, 6px 6px 0px #D97706`
                                            : `2px 2px 0px #C6211D, 6px 6px 0px transparent`,
                                    borderColor: "#C6211D",
                                }}
                                className={`
                  px-6 py-2 
                  text-lg md:text-2xl 
                  font-bold 
                  text-white 
                  transition-all
                  rounded-xl
                  border-4
                  hover:translate-x-1
                  hover:translate-y-1
                  uppercase
                  tracking-wider
                  ${selectedCategory === category ? "bg-[#FF8000]" : "bg-[#C6211D]"}
                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
