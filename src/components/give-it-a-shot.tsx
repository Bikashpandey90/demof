"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"

export default function GiveItAShot() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [animationData, setAnimationData] = useState(null)

    const products = [
        {
            id: 1,
            name: "SACHETS",
            image: "/mugshotsachet.png",
            prop: "contain",
            color: "red",
        },
        {
            id: 2,
            name: "POTS",
            image: "/mightypot.png",
            prop: "cover",
            color: "green",
        },
        {
            id: 3,
            name: "MIGHTY POTS",
            image: "/pot.png",
            prop: "cover",
            color: "yellow",
        },
    ]

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length)
    }
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    }
    useEffect(() => {
        fetch("/animation/animation.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Failed to load Lottie:", err))
    }, [])

    return (


        <section className="bg-[#C6211D] py-6 sm:py-10 relative overflow">
            {/* <img
                src="swoosh2.svg"
                className="absolute inset-0 mt-20 sm:mt-8 self-center justify-self-center scale-100  sm:scale-75 md:scale-[.65] z-20 pointer-events-none"
            /> */}
            {animationData && (
                <Lottie
                    animationData={animationData}
                    loop={false}
                    autoplay
                    className="absolute inset-0 mt-20 sm:mt-8 self-center justify-self-center scale-100 sm:scale-75 md:scale-[.65] z-20 pointer-events-none"
                />
            )}

            <div className="max-w-6xl mx-auto px-3 sm:px-4 w-full relative">
                <div className="mt-32 sm:mt-10 mb-8 sm:mb-16 bg-transparent flex justify-center items-center">
                    <img src="/giveitashot2.png" alt="Mug Shot sachet" className="scale-[2] sm:scale-100 md:scale-125" />
                </div>

                <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center mb-12 sm:mb-20">
                    <div className="relative w-full max-w-md">
                        <div className="flex justify-center items-center gap-4 sm:gap-8 px-2 sm:px-4 mb-2">
                            <div
                                className="relative h-56 sm:h-72 md:h-[360px] w-40 sm:w-60 md:w-72 flex items-center justify-center overflow transition-opacity duration-500"
                                key={currentIndex}
                            >
                                <img
                                    src={products[currentIndex].image || "/placeholder.svg"}
                                    alt={products[currentIndex].name}
                                    className={`w-full h-full mt-36 sm:mt-0 object-${products[currentIndex].prop} scale-[1.25] sm:scale-100 drop-shadow-2xl overflow animate-in fade-in duration-500 z-20`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 sm:gap-4 z-100">
                            <button
                                onClick={prevSlide}
                                className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-green-400 transition-colors duration-200 p-1 sm:p-2"
                                aria-label="Previous product"
                            >
                                ❮
                            </button>

                            <div className="text-white text-center">
                                <div className="font-bold text-lg sm:text-2xl md:text-3xl rounded-lg px-4 sm:px-8 py-2 sm:py-3 bg-transparent">
                                    {products[currentIndex].name.toUpperCase()}
                                </div>
                            </div>

                            <button
                                onClick={nextSlide}
                                className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-green-400 transition-colors duration-200 p-1 sm:p-2"
                                aria-label="Next product"
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-32 sm:mt-16 flex flex-col items-center justify-end h-48 sm:h-80 md:h-[300px] lg:h-[320px] z-10">
                <img
                    src="/takeamugshot.png"
                    alt="take a mug shot"
                    className="absolute top-0 left-8 sm:left-20 md:left-40 -top-6 sm:-top-8 md:-top-10 w-32 sm:w-48 md:w-[250px] lg:w-[350px] z-0"
                />
                <img
                    src="/bowl.png"
                    alt="bowl"
                    className="w-80 sm:w-96 md:w-[650px] absolute ml-12 sm:ml-24 md:ml-48 top-0 z-10"
                />
                <img
                    src="/tomatoes.png"
                    alt="tomatoes"
                    className="absolute right-0 top-4 sm:top-8 md:top-10 w-40 sm:w-64 md:w-[300px] z-0"
                />
            </div>
        </section>
    )
}
