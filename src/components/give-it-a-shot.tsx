"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import Lottie from "lottie-react"
// import SwooshSVG from "./swoosh-svg"
import categorySvc, { CategoryData } from "@/services/category.service"
import { handleReveal } from "@/helper/helper"
import MomoSvg from "./momo"


interface GiveItAShotProps {
    onCategoryClick?: (category: string) => void
}

export default function GiveItAShot({ onCategoryClick }: GiveItAShotProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [animationData, setAnimationData] = useState(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [animationComplete, setAnimationComplete] = useState(false)
    const lottieRef = useRef<any>(null)
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)
    const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [categories, setCategories] = useState<CategoryData[]>([])

    const [dragStart, setDragStart] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: takeAShotRef, inView: takeAShotInView } = useInView({ threshold: 0.3 })
    const { ref: bowlRef, inView: bowlInView } = useInView({ threshold: 0.3 })
    const { ref: tomatoesRef, inView: tomatoesInView } = useInView({ threshold: 0.3 })



    const fetchCategories = async () => {
        try {
            const response = await categorySvc.getAllCategory()
            console.log(response)
            setCategories(response.detail)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.5)
        }
    }, [lottieRef])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsScrollingDown(currentScrollY > lastScrollY.current)
            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])





    const [takeAShotRevealed, setTakeAShotRevealed] = useState(false)
    const [bowlRevealed, setBowlRevealed] = useState(false)
    const [tomatoesRevealed, setTomatoesRevealed] = useState(false)

    const leftIndex = (currentIndex - 1 + categories.length) % categories.length
    const middleIndex = currentIndex
    const rightIndex = (currentIndex + 1) % categories.length

    const wasInView = useRef({
        takeAShot: false,
        bowl: false,
        tomatoes: false,
    });


    const nextSlide = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev + 1) % categories.length)
        setAutoPlayEnabled(false)
    }
    const prevSlide = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
        setAutoPlayEnabled(false)
    }

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const position = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
        setDragStart(position)
        setIsDragging(true)
        setDragOffset(0)
    }

    const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return
        const position = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
        setDragOffset(position - dragStart)
    }

    const handleDragEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const position = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX
        handleSwipe(position)
        setIsDragging(false)
        setDragOffset(0)
    }

    const handleSwipe = (endPosition: number) => {
        const distance = endPosition - dragStart
        const threshold = 50 // minimum pixels to trigger slide change

        if (Math.abs(distance) > threshold) {
            if (distance < 0) {
                nextSlide()
            } else {
                prevSlide()
            }
        }
    }

    const handleCategoryImageClick = () => {
        if (onCategoryClick) {
            onCategoryClick(categories[middleIndex]?.title)
        }
    }

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [isTransitioning])

    useEffect(() => {
        fetch("/animation/animation.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Failed to load Lottie:", err))
    }, [])

    useEffect(() => {
        if (!autoPlayEnabled) {
            if (autoPlayTimeoutRef.current) {
                clearTimeout(autoPlayTimeoutRef.current)
            }
            return
        }

        autoPlayTimeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length)
            setIsTransitioning(true)
        }, 5000)

        return () => {
            if (autoPlayTimeoutRef.current) {
                clearTimeout(autoPlayTimeoutRef.current)
            }
        }
    }, [currentIndex, autoPlayEnabled, categories.length])

    useEffect(() => {
        const justEnteredTakeAShot = takeAShotInView && !wasInView.current.takeAShot;
        handleReveal(takeAShotInView, setTakeAShotRevealed, isScrollingDown, justEnteredTakeAShot);
        wasInView.current.takeAShot = takeAShotInView;
    }, [takeAShotInView, isScrollingDown]);

    useEffect(() => {
        const justEnteredBowl = bowlInView && !wasInView.current.bowl;
        handleReveal(bowlInView, setBowlRevealed, isScrollingDown, justEnteredBowl);
        wasInView.current.bowl = bowlInView;
    }, [bowlInView, isScrollingDown]);

    useEffect(() => {
        const justEnteredTomatoes = tomatoesInView && !wasInView.current.tomatoes;
        handleReveal(tomatoesInView, setTomatoesRevealed, isScrollingDown, justEnteredTomatoes);
        wasInView.current.tomatoes = tomatoesInView;
    }, [tomatoesInView, isScrollingDown]);


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

                .carousel-slide-dragging {
                    transition: none;
                }
            `}</style>
            <section
                className={` py-6 sm:py-10 relative overflow transition-colors duration-700`}
                style={{
                    backgroundColor: `${categories[middleIndex]?.backgroundColor}`
                }}
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
                        {/* <SwooshSVG
                            innerColor={categories[middleIndex]?.secondaryColor}
                            outerColor={categories[middleIndex]?.primaryColor}
                        /> */}
                        <MomoSvg
                            innerColor={categories[middleIndex]?.secondaryColor}
                            outerColor={categories[middleIndex]?.primaryColor}
                        />
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-3 sm:px-4 w-full relative">
                    <div className="mt-32 sm:mt-10 lg:mt-2 mb-8 md:mb-0 bg-black sm:mb-16 bg-transparent flex-col flex justify-center items-center">
                        <div className="flex flex-col items-start justify-start   mt-2 lg:mt-8 sm:mt-6 mb-4">
                            <span className="  font-brando rotate-[-10deg] sm:rotate-[-12deg] lg:rotate-[-10deg] text-white leading-10 text-[48px] sm:text-[42px] md:text-[72px] lg:text-[100px] flex   items-center justify-center max-w-full">
                                INDIA's #1
                            </span>
                            <span className="font-brando rotate-[-10deg] lg:-mt-7 sm:rotate-[-12deg] lg:rotate-[-10deg] text-white leading-2 text-[58px] sm:text-[56px] md:text-[96px] lg:text-[160px]  flex   items-center justify-center max-w-full">
                                MOMO
                            </span>
                        </div>
                    </div>

                    <div
                        ref={carouselRef}
                        className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center mb-12 sm:mb-20 cursor-grab active:cursor-grabbing select-none"
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                    >
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className="relative w-full md:mt-20 justify-center gap-64 items-center flex max-w-md">
                                <img
                                    src={categories[leftIndex]?.image || "/placeholder.svg"}
                                    alt="left carousel item"
                                    className={`${isDragging ? 'carousel-slide-dragging' : 'carousel-slide'} w-[45%] h-[45%] object-cover mt-36 sm:mt-0 scale-[1.25] sm:scale-100 drop-shadow-2xl overflow place-self-end items-center z-20`}
                                    style={{
                                        transform: `translateX(${isDragging ? dragOffset * 0.2 : 0}px)`,
                                    }}
                                    draggable={false}
                                />
                                <div className="flex justify-center items-center gap-4 sm:gap-8 px-2 sm:px-4 mb-2">
                                    <div
                                        className="relative h-56 sm:h-72 md:h-[360px] w-40 sm:w-60 md:w-72 flex items-center justify-center overflow"
                                        key="carousel-container"
                                    >
                                        <img
                                            src={categories[middleIndex]?.image || "/placeholder.svg"}
                                            alt={categories[middleIndex]?.title}
                                            onClick={handleCategoryImageClick}
                                            className={`${isDragging ? 'carousel-slide-dragging' : 'carousel-slide'} w-full h-full mt-36 sm:mt-0 ${categories[middleIndex]?.title.toUpperCase() === 'SACHETS ' ? 'object-contain' : 'object-cover'} scale-[1.25] sm:scale-[1.1] z-20 cursor-pointer`}
                                            style={{
                                                transform: `translateX(${isDragging ? dragOffset * 0.5 : 0}px)`,
                                            }}

                                            onMouseEnter={() => {
                                                setAutoPlayEnabled(false)
                                            }}
                                            onMouseLeave={() => {
                                                setAutoPlayEnabled(true)
                                            }}
                                            draggable={false}
                                        />
                                    </div>
                                </div>
                                <img
                                    src={categories[rightIndex]?.image || "/placeholder.svg"}
                                    alt="right carousel item"
                                    className={`${isDragging ? 'carousel-slide-dragging' : 'carousel-slide'} w-[45%] h-[45%] mt-36 sm:mt-0 object-cover drop-shadow-2xl overflow place-self-end z-20`}
                                    style={{
                                        transform: `translateX(${isDragging ? dragOffset * 0.2 : 0}px)`,
                                    }}
                                    draggable={false}
                                />
                            </div>

                            <div className="flex items-center mt-20 sm:mt-0 justify-center gap-2 sm:gap-0 z-[40]">
                                <button
                                    onClick={prevSlide}
                                    className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-green-400 transition-colors duration-200 p-1 sm:p-2"
                                    aria-label="Previous product"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18.05" height="33.097" viewBox="0 0 18.05 33.097">
                                        <path
                                            id="Path_499"
                                            data-name="Path 499"
                                            d="M-2579.919,661.509l-7.614-7.447-7.613-7.447,7.613-7.447,7.614-7.447"
                                            transform="translate(2596.315 -630.066)"
                                            fill="none"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.339"
                                        ></path>
                                    </svg>
                                </button>

                                <div className="text-white text-center">
                                    <div className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-[40px] leading-10 rounded-lg font-gothic px-4 sm:px-8 py-2 sm:py-3 bg-transparent transition-all duration-700">
                                        {categories[middleIndex]?.title.toUpperCase()}
                                    </div>
                                </div>

                                <button
                                    onClick={nextSlide}
                                    className="text-white text-2xl sm:text-3xl md:text-4xl hover:text-green-400 transition-colors duration-200 p-1 sm:p-2"
                                    aria-label="Next product"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18.05" height="33.097" viewBox="0 0 18.05 33.097">
                                        <path
                                            id="Path_500"
                                            data-name="Path 500"
                                            d="M-2425.92,661.509l7.614-7.447,7.613-7.447-7.613-7.447-7.614-7.447"
                                            transform="translate(2427.574 -630.066)"
                                            fill="none"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.339"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mt-32 sm:mt-16 lg:mt-44 xl:mt-56 flex flex-col items-center justify-end h-48 sm:h-80 md:h-[300px] lg:h-[320px] z-10">
                    <img
                        ref={takeAShotRef}
                        src="/takeamugshot.png"
                        alt="take a mug shot"
                        className="absolute top-0 left-8 hidden md:hidden lg:block sm:block sm:left-20 md:left-10 lg:left-14 xl:left-36 sm:-top-8 md:-top-10 w-32 sm:w-48 md:w-[250px] lg:w-[350px] z-0 transition-all duration-500"
                        style={{
                            opacity: takeAShotRevealed ? 1 : 0,
                            transform: takeAShotRevealed ? "translateY(0)" : "translateY(30px)",
                        }}
                    />
                    <img
                        ref={bowlRef}
                        src={categories[middleIndex]?.bowlImage || "/placeholder.svg"}
                        alt="bowl"
                        className="w-80 sm:w-96 md:w-[650px] absolute ml-12 sm:ml-24 md:ml-48 top-0 z-10 transition-all duration-500"
                        style={{
                            opacity: bowlRevealed ? 1 : 0,
                            transform: bowlRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDuration: "1000ms",
                            transitionDelay: "100ms",
                        }}
                    />
                    <img
                        ref={tomatoesRef}
                        src={categories[middleIndex]?.ingridientsImage || "/placeholder.svg"}
                        alt="tomatoes"
                        className="absolute right-0 top-4 sm:top-8 md:top-10 w-40 sm:w-64 md:w-[300px] z-0 transition-all duration-500"
                        style={{
                            opacity: tomatoesRevealed ? 1 : 0,
                            transform: tomatoesRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDuration: "1000ms",
                            transitionDelay: "200ms",
                        }}
                    />
                </div>
            </section >
            <img
                src="/bg-header-top.png"
                alt="Top irregular edge"
                className={` w-full scale-[1.2] h-auto block -mt-[1px] z-100 pointer-events-none transition-colors duration-700`}
                style={{
                    display: "block", margin: 0, padding: 0, lineHeight: 0,
                    backgroundColor: `${categories[middleIndex]?.backgroundColor}`
                }}
            />
        </>
    )
}
