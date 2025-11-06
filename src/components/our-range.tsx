"use client"

import NeuButton from "./button"
import { useRef } from "react"

export default function OurRange() {
    const products = [
        { id: 1, name: "Chicken", image: "/products/blue.png" },
        { id: 2, name: "Beef", image: "/products/pink.png" },
        { id: 3, name: "Prawn", image: "/products/yellow.png" },
        { id: 4, name: "BBQ", image: "/products/yellow2.png" },
        { id: 5, name: "Spicy", image: "/products/brown.png" },
        { id: 6, name: "Tomato", image: "/products/purple.png" },
        { id: 7, name: "Herbs", image: "/products/yellow3.png" },
        { id: 8, name: "Chicken", image: "/products/blue2.png" },
        { id: 9, name: "Spicy", image: "/products/brown2.png" },
        { id: 10, name: "Chicken", image: "/products/skyblue.png" },
        { id: 11, name: "Chicken", image: "/products/lightgreen.png" },
        { id: 12, name: "Chicken", image: "/products/red.png" },
        { id: 13, name: "Chicken", image: "/products/green.png" },
    ]

    const sliderRef = useRef<HTMLDivElement>(null)

    // drag logic
    const handleMouseDown = (e: React.MouseEvent) => {
        const slider = sliderRef.current
        if (!slider) return

        slider.classList.add("grabbing")
        const startX = e.pageX - slider.offsetLeft
        const scrollLeft = slider.scrollLeft

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const x = moveEvent.pageX - slider.offsetLeft
            const walk = (x - startX) * 1.5 // scroll speed multiplier
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

    return (
        <section className="bg-[#C6211D] py-24 relative overflow">
            <div className="w-full mx-auto">
                <h2 className="text-7xl md:text-7xl leading-[6rem] font-bold text-white text-center mb-8 drop-shadow-lg font-turbinado">
                    Our range
                </h2>

                <p className="text-white text-center text-2xl mb-4 font-gothic leading-9 font-bold">
                    When you're on the go, take time out for a few delicious minutes with Mug Shot, the
                    <br />
                    warm, comforting, convenient flavour-packed snack.
                </p>

                <p className="text-white text-center text-2xl mb-16 font-bold font-gothic leading-9">
                    For the perfect pick me up. Wherever you're heading.
                </p>

                {/* 🔥 Draggable product slider */}
                <div
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none pb-8 mb-12"
                >
                    <div className="flex gap-6 px-8 w-max overflow">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col items-center flex-shrink-0"
                            >
                                <div className="w-[220px] h-80 flex items-center justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-80 w-auto pointer-events-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">SACHETS</h3>
                    </div>
                    <NeuButton color={'#C6211D'}>
                        POTS
                    </NeuButton>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">MIGHTY POTS</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
