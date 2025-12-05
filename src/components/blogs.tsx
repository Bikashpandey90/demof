"use client"

import { useEffect, useRef, useState } from "react"
import useMeasure from "react-use-measure"
import IngridientTop from "./svg/ingridientTop"
import { useInView } from "react-intersection-observer"
import NeuButton from "./buttons/neu"
import { useNavigate } from "react-router-dom"

const CardCarousel = () => {
    const [ref] = useMeasure()
    const { ref: buttonRef, inView: buttonInView } = useInView({ threshold: 0.3 })
    const [buttonRevealed, setButtonRevealed] = useState(false)

    const [items] = useState([
        {
            id: 1,
            image: "/post1.webp",
            title: "Anya Hindmarch Ice Cream.",
            link: "/blogs",
            description: "McVitie's will be returning to the Anya Hindmarch summer concept store...",
        },
        {
            id: 2,
            image: "/post2.webp",
            title: "Introducing McVitie's Pink Digestives.",
            link: "/blogs",
            description: "Bringing a burst of colour into the biscuit world, McVitie's Pink and...",
        },
        {
            id: 3,
            image: "/post3.webp",
            title: "McVitie's Chocolate Digestives...",
            link: "/blogs",
            description: "McVitie's launched the Chocolate Digestives Experience, an immersive...",
        },
    ])

    const [headingRevealed, setHeadingRevealed] = useState(false)
    const [descriptionRevealed, setDescriptionRevealed] = useState(false)
    const [postsRevealed, setPostsRevealed] = useState(false)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3 })
    const { ref: descriptionRef, inView: descriptionInView } = useInView({ threshold: 0.3 })
    const { ref: postsContainerRef, inView: postsInView } = useInView({ threshold: 0.2 })

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
        if (headingInView && isScrollingDown) setHeadingRevealed(true)
    }, [headingInView, isScrollingDown])

    useEffect(() => {
        if (descriptionInView && isScrollingDown) setDescriptionRevealed(true)
    }, [descriptionInView, isScrollingDown])

    useEffect(() => {
        if (postsInView && isScrollingDown) setPostsRevealed(true)
    }, [postsInView, isScrollingDown])

    useEffect(() => {
        if (buttonInView && isScrollingDown) setButtonRevealed(true)
    }, [buttonInView, isScrollingDown])

    return (
        <>
            <div className="relative w-full " style={{ backgroundColor: "#ececec" }}>
                <IngridientTop color={"#ff8000"} />
            </div>

            <section className="bg-[#ff8000] " ref={ref}>
                <div className="relative overflow-hidden p-4 ">
                    <div className="mx-auto max-w-6xl lg:my-16">
                        <p
                            className="mb-4 font-semibold text-white text-center font-turbinado text-8xl leading-[96px] transition-all duration-1000"
                            ref={headingRef}
                            style={{
                                opacity: headingRevealed ? 1 : 0,
                                transform: headingRevealed ? "translateY(0)" : "translateY(30px)",
                            }}
                        >
                            News <span className="text-gray-200">and more.</span>
                        </p>

                        <p
                            ref={descriptionRef}
                            className="text-white text-center text-2xl leading-8 mb-12 font-bold font-gothic transition-all duration-1000"
                            style={{
                                opacity: descriptionRevealed ? 1 : 0,
                                transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "100ms",
                            }}
                        >
                            We're always happy to hear from our customers, whether it be to give
                            <br />
                            feedback on our products, provide suggestions on how you think we could
                            <br />
                            do better, or simply just make enquiries about the business.
                        </p>

                        <div
                            ref={postsContainerRef}
                            className="flex gap-5 lg:gap-8 mb-10 overflow-x-auto lg:overflow-visible scroll-smooth lg:justify-center lg:flex-nowrap transition-all duration-1000 scrollbar-hide"
                            style={{
                                opacity: postsRevealed ? 1 : 0,
                                transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "300ms",
                            }}
                        >
                            {items.map((item) => (
                                <BrandStoryCards key={item.id} card={item} />
                            ))}
                        </div>

                        <div
                            ref={buttonRef}
                            className=" flex justify-center items-center mb-10"
                            style={{
                                opacity: buttonRevealed ? 1 : 0,
                                transform: buttonRevealed ? "translateY(0)" : "translateY(30px)",
                                transition: "all 1000ms",
                                transitionDelay: "200ms",
                            }}
                        >
                            <NeuButton text="SEE MORE" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

interface BrandStoryCard {
    id: number
    image: string
    title: string
    description: string
    link?: string
}

interface BrandStoryCardsProps {
    card: BrandStoryCard
}

const BrandStoryCards = ({ card }: BrandStoryCardsProps) => {
    const navigate = useNavigate()
    return (
        <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300  hover:-translate-y-2 w-[280px] flex-shrink-0 hover:shadow-2xl">
            <div
                className="overflow-hidden bg-slate-100 h-64   rounded-3xl"
                onClick={() => {
                    navigate(card?.link ?? "")
                }}
            >
                <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 "
                />
            </div>

            <div className="px-4 pb-4 mt-8 mb-10">
                <h3 className=" font-bold text-blue-900 mb-2 text-3xl font-escuela line-clamp-3">{card.title}</h3>
                <p className="text-gray-600 text-base font-escuelalight  leading-relaxed line-clamp-3">{card.description}</p>
            </div>
        </div>
    )
}

export default CardCarousel
