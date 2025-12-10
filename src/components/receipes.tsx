"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import NeuButton from "./buttons/neu"
import { useInView } from "react-intersection-observer"

const recipes = [
    {
        id: 1,
        name: "Fire Roasted Jalapeño Nachos",
        image: "/receipe 3.jpg",
    },
    {
        id: 2,
        name: "Cinnamon Sugar Blackberry Crisp",
        image: "/receipe 2.jpg",
    },
    {
        id: 3,
        name: "Kale and Brussel Salad",
        image: "/receipe 1.jpg",
    },
]

export default function RecipesSection() {
    const [currentIndex, setCurrentIndex] = useState(0)


    const [buttonRevealed, setButtonRevealed] = useState(false)
    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: buttonRef, inView: buttonInView } = useInView({ threshold: 0.3 })

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsScrollingDown(currentScrollY > lastScrollY.current)
            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (buttonInView && isScrollingDown) setButtonRevealed(true)
    }, [buttonInView, isScrollingDown])


    const [cardsToShow, setCardsToShow] = useState(3)

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 640) setCardsToShow(1)
            else if (window.innerWidth < 1024) setCardsToShow(2)
            else setCardsToShow(3)
        }

        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    const visibleRecipes = Array.from({ length: cardsToShow }, (_, i) => {
        return recipes[(currentIndex + i) % recipes.length]
    })


    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1))
    }


    return (
        <section className="w-full bg-[#F8AD00] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[80px] leading-[96px] font-script text-white text-center font-turbinado mb-12 drop-shadow-lg">
                    RECIPES
                </h2>

                <div className="flex items-center justify-between gap-8 mb-12">
                    <button
                        onClick={handlePrev}
                        className="flex-shrink-0 sm:w-6 sm:h-6 w-6 h-6 lg:w-12 lg:h-12 bg-[#C6211D] rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                        aria-label="Previous recipes"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleRecipes.map((recipe) => (
                            <div key={recipe.id} className="flex flex-col rounded-sm">
                                <div className="relative w-full h-full aspect-square overflow-hidden">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="object-cover w-full h-full rounded-t-sm"
                                    />
                                </div>

                                <div className="bg-[#C6211D] px-6 py-6 text-center flex-1 flex flex-col justify-between rounded-b-sm">
                                    <h3 className="text-white font-bold text-lg mb-3 font-gothic leading-snug">
                                        {recipe.name}
                                    </h3>
                                    <button className="text-white hover:text-gray-300 transition text-sm font-medium">
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex-shrink-0 sm:w-6 sm:h-6 w-6 h-6 lg:w-12 lg:h-12 bg-[#C6211D] rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                        aria-label="Next recipes"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div
                    ref={buttonRef}
                    style={{
                        opacity: buttonRevealed ? 1 : 0,
                        transform: buttonRevealed ? "translateY(0)" : "translateY(30px)",
                        transition: "all 1000ms",
                        transitionDelay: "200ms",
                    }}
                    className="flex justify-center"
                >
                    <NeuButton text="VIEW ALL RECIPES" />
                </div>
            </div>
        </section>
    )
}
