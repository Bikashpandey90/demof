"use client"

import { useEffect, useRef, useState } from "react"
import Lottie from "lottie-react"
import SwooshSVG from "./swoosh-svg"

interface GiveItAShotProps {
    onCategoryClick?: (category: string) => void
}

export default function GiveItAShot({ onCategoryClick }: GiveItAShotProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [animationData, setAnimationData] = useState(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [animationComplete, setAnimationComplete] = useState(false)
    const lottieRef = useRef<any>(null)

    const categories = [
        {
            id: 1,
            name: "SACHETS",
            image: "/mugshotsachet.png",
            prop: "contain",
            bgColor: "bg-[#C6211D]",
            bowl: "/bowl.png",
            tomatoes: "/tomatoes.png",
            swooshInnerColor: "#94C68D",
            swooshOuterColor: "#459941",
        },
        {
            id: 2,
            name: "POTS",
            image: "/mightypot.png",
            prop: "cover",
            bgColor: "bg-[#3B863B]",
            bowl: "/greenbowl.png",
            tomatoes: "/broc.png",
            swooshInnerColor: "#96C423",
            swooshOuterColor: "#56B22D",
        },
        {
            id: 3,
            name: "MIGHTY POTS",
            image: "/pot.png",
            prop: "cover",
            bgColor: "bg-[#F8B400]",
            bowl: "/yellowbowl.png",
            tomatoes: "/onion.png",
            swooshInnerColor: "#FDA922",
            swooshOuterColor: "#914C25",
        },
    ]

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.5)
        }
    }, [])

    const leftIndex = (currentIndex - 1 + categories.length) % categories.length
    const middleIndex = currentIndex
    const rightIndex = (currentIndex + 1) % categories.length

    const nextSlide = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev + 1) % categories.length)
    }
    const prevSlide = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
    }

    const handleCategoryImageClick = () => {
        if (onCategoryClick) {
            onCategoryClick(categories[middleIndex].name)
        }
    }

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(false), 700)
            return () => clearTimeout(timer)
        }
    }, [isTransitioning])

    useEffect(() => {
        fetch("/animation/animation.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Failed to load Lottie:", err))
    }, [])

    return (
        <>
            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .carousel-slide {
                    transition: all 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>
            <section
                className={`${categories[middleIndex].bgColor} py-6 sm:py-10 relative overflow transition-colors duration-700`}
            >
                {animationData && !animationComplete && (
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={animationData}
                        loop={false}
                        autoplay
                        onComplete={() => setAnimationComplete(true)}
                        className="absolute m-2 sm:m-4 md:mt-14 lg:mt-0 md:m-10 inset-0 mt-60 sm:mt-8 self-center justify-self-center scale-100 sm:scale-75 md:scale-[.65] z-20 pointer-events-none"
                    />
                )}
                {animationComplete && (
                    <div className="absolute m-2 sm:m-4 md:mt-14 lg:mt-0 md:m-10 inset-0 mt-60 sm:mt-8 self-center justify-self-center scale-100 sm:scale-75 md:scale-[.65] z-20 pointer-events-none">
                        <SwooshSVG
                            innerColor={categories[middleIndex].swooshInnerColor}
                            outerColor={categories[middleIndex].swooshOuterColor}
                        />
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-3 sm:px-4 w-full relative">
                    <div className="mt-32 sm:mt-10 lg:mt-2  mb-8 md:mb-0 bg-black sm:mb-16 bg-transparent flex justify-end items-center">
                        <img src="/giveitashot2.png" alt="Mug Shot sachet" className="scale-[2] sm:scale-100 md:scale-125" />
                    </div>

                    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center mb-12 sm:mb-20">
                        <div className="flex flex-col justify-center items-center w-full ">
                            <div className="relative w-full md:mt-20 justify-center gap-64  items-center flex max-w-md ">
                                <img
                                    src={categories[leftIndex].image || "/placeholder.svg"}
                                    alt="left carousel item"
                                    className={`carousel-slide w-[45%] h-[45%] object-cover mt-36 sm:mt-0 scale-[1.25] sm:scale-100 drop-shadow-2xl overflow place-self-end items-center z-20 ${isTransitioning ? "" : ""}`}
                                />
                                <div className="flex justify-center items-center gap-4 sm:gap-8 px-2 sm:px-4 mb-2 ">
                                    <div
                                        className="relative h-56 sm:h-72 md:h-[360px] w-40 sm:w-60 md:w-72 flex items-center justify-center overflow"
                                        key="carousel-container"
                                    >
                                        <img
                                            src={categories[middleIndex].image || "/placeholder.svg"}
                                            alt={categories[middleIndex].name}
                                            onClick={handleCategoryImageClick}
                                            className={`carousel-slide w-full h-full mt-36 sm:mt-0 object-${categories[middleIndex].prop} scale-[1.25] sm:scale-[1.1] z-20 cursor-pointer ${isTransitioning ? "" : ""}`}
                                        />
                                    </div>
                                </div>
                                <img
                                    src={categories[rightIndex].image || "/placeholder.svg"}
                                    alt="right carousel item"
                                    className={`carousel-slide w-[45%] h-[45%] mt-36 sm:mt-0 object-cover drop-shadow-2xl overflow place-self-end z-20 ${isTransitioning ? "" : ""}`}
                                />
                            </div>

                            <div className="flex items-center mt-20 sm:mt-0 justify-center gap-2 sm:gap-0 z-[40]">
                                <button
                                    onClick={prevSlide}
                                    className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-green-400 transition-colors duration-200 p-1 sm:p-2"
                                    aria-label="Previous product"
                                >
                                    ❮
                                </button>

                                <div className="text-white text-center">
                                    <div className="font-bold text-2xl sm:text-2xl md:text-3xl leading-7 rounded-lg font-gothic px-4 sm:px-8 py-2 sm:py-3 bg-transparent transition-all duration-700">
                                        {categories[middleIndex].name.toUpperCase()}
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

                <div className="relative mt-32   sm:mt-16 flex flex-col items-center justify-end h-48 sm:h-80 md:h-[300px] lg:h-[320px] z-10">
                    <img
                        src="/takeamugshot.png"
                        alt="take a mug shot"
                        className="absolute top-0 left-8 hidden md:hidden lg:block sm:block sm:left-20 md:left-10 lg:left-10  sm:-top-8 md:-top-10 w-32 sm:w-48 md:w-[250px] lg:w-[350px] z-0"
                    />
                    <img
                        src={categories[middleIndex].bowl || "/placeholder.svg"}
                        alt="bowl"
                        className="w-80 sm:w-96 md:w-[650px] absolute ml-12 sm:ml-24 md:ml-48 top-0 z-10 transition-all duration-700"
                    />
                    <img
                        src={categories[middleIndex].tomatoes || "/placeholder.svg"}
                        alt="tomatoes"
                        className="absolute right-0 top-4 sm:top-8 md:top-10 w-40 sm:w-64 md:w-[300px] z-0 transition-all duration-700"
                    />
                </div>
            </section>
            <img
                src="/bg-header-top.png"
                alt="Top irregular edge"
                className={`${categories[middleIndex].bgColor} w-full scale-[1.2] h-auto block  -mt-[1px] z-100 pointer-events-none transition-colors duration-700`}
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
        </>
    )
}
