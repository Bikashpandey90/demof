"use client"

import { useState } from "react"

export default function GiveItAShot() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<"prev" | "next">("next")


    const products = [
        {
            id: 1,
            name: "SACHETS",
            image: "/mugshotsachet.png",
        },
        {
            id: 2,
            name: "POTS",
            image: "/pots.png",
        },
        {
            id: 3,
            name: "MIGHTY POTS",
            image: "/mightypots.png",
        },
    ]

    const sachets = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" },
    ]

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % sachets.length)
    }
    const prevSlide = () => {
        setDirection("prev")
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    }

    return (
        <section className="bg-[#C6211D] py-10 -top-[300px]  relative overflow ">
            <img src='swoosh2.svg' className="absolute inset-0 mt-8 self-center justify-self-center scale-[.65]  z-20 " />

            <div className="max-w-6xl mx-auto px-4 w-full relative">
                <div className=" mt-10 mb-16 bg-transparent flex justify-center  items-center">
                    <img src="/giveitashot2.png" alt="Mug Shot sachet" className="scale-125" />

                </div>

                {/* //carousel container */}
                <div className="relative h-96 flex items-center justify-center mb-20">
                    {/* Carousel content */}
                    <div className="relative w-full max-w-md">
                        {/* Product image with fade transition */}
                        <div className="flex justify-center mb-2">
                            <div
                                className="relative mt-4 h-[360px] w-72 flex items-center justify-center transition-opacity duration-500"
                                key={currentIndex}
                            >
                                <img
                                    src={products[currentIndex].image || "/placeholder.svg"}
                                    alt={products[currentIndex].name}
                                    className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in duration-500 z-20"
                                />
                            </div>

                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center mt z-100">
                            <button
                                onClick={prevSlide}
                                className="text-white text-4xl hover:text-green-400 transition-colors duration-200 p-2"
                                aria-label="Previous product"
                            >
                                ❮
                            </button>

                            <div className="text-white text-center">
                                <div className=" font-bold text-3xl rounded-lg px-8 py-3 bg-transparent">
                                    {products[currentIndex].name.toUpperCase()}
                                </div>

                            </div>

                            <button
                                onClick={nextSlide}
                                className="text-white text-4xl hover:text-green-400 transition-colors duration-200 p-2"
                                aria-label="Next product"
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                </div>


                {/* ✅ Bottom bowl + text + tomatoes */}


            </div>
            <div className="relative mt-16 flex flex-col items-center justify-end h-[750px] md:h-[400px] z-10 ">
                <img
                    src="/takeamugshot.png"
                    alt="take a mug shot"
                    className="absolute top-0 left-40  md:-top-10  w-[250px] md:w-[350px] z-0"
                />
                <img
                    src="/bowl.png"
                    alt="bowl"
                    className="w-[650px] absolute ml-48 top-0 z-10 "
                />
                <img
                    src="/tomatoes.png"
                    alt="tomatoes"
                    className="absolute right-0 top-10 w-[300px] md:w-[300px] z-0"
                />
            </div>
        </section>
    )
}
