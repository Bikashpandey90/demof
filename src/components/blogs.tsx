"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import useMeasure from "react-use-measure"
import IngridientTop from "./svg/ingridientTop"
import { useInView } from "react-intersection-observer"
import NeuButton from "./buttons/neu"

const CARD_WIDTH = 280
const MARGIN = 20
const CARD_SIZE = CARD_WIDTH + MARGIN

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
}

const CardCarousel = () => {
    const [ref, { width }] = useMeasure()
    const [offset, setOffset] = useState(0)
    const { ref: buttonRef, inView: buttonInView } = useInView({ threshold: 0.3 })
    const [buttonRevealed, setButtonRevealed] = useState(false)


    const [items] = useState([
        {
            id: 1,
            image: "/post1.webp",
            title: "Anya Hindmarch Ice Cream.",
            description: "McVitie's will be returning to the Anya Hindmarch summer concept store...",
        },
        {
            id: 2,
            image: "/post2.webp",
            title: "Introducing McVitie's Pink Digestives.",
            description: "Bringing a burst of colour into the biscuit world, McVitie's Pink...",
        },
        {
            id: 3,
            image: "/post3.webp",
            title: "McVitie's Chocolate Digestives...",
            description: "McVitie's launched the Chocolate Digestives Experience, an immersive...",
        },
    ])

    const CARD_BUFFER = width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1

    const CAN_SHIFT_LEFT = offset < 0

    const CAN_SHIFT_RIGHT = Math.abs(offset) < CARD_SIZE * (items?.length - CARD_BUFFER)

    const shiftLeft = () => {
        if (!CAN_SHIFT_LEFT) {
            return
        }
        setOffset((pv) => (pv += CARD_SIZE))
    }

    const shiftRight = () => {
        if (!CAN_SHIFT_RIGHT) {
            return
        }
        setOffset((pv) => (pv -= CARD_SIZE))
    }

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
                        <motion.div
                            drag="x"
                            dragElastic={0.1}
                            dragConstraints={{ left: -CARD_SIZE * (items.length - CARD_BUFFER), right: 0 }}
                            onDragEnd={(event, info) => {
                                const threshold = CARD_SIZE / 3
                                console.log(event)
                                if (info.offset.x < -threshold && CAN_SHIFT_RIGHT) {
                                    shiftRight()
                                } else if (info.offset.x > threshold && CAN_SHIFT_LEFT) {
                                    shiftLeft()
                                }
                            }}
                            animate={{ x: offset }}
                            className="flex gap-5 lg:gap-8 mb-10 cursor-grab active:cursor-grabbing select-none justify-center items-center transition-all duration-1000"
                            ref={postsContainerRef}
                            style={{
                                opacity: postsRevealed ? 1 : 0,
                                transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "300ms",
                            }}
                        >
                            {items.map((item) => (
                                <BrandStoryCards key={item.id} card={item} />
                            ))}

                        </motion.div>

                        <div
                            ref={buttonRef}
                            className=" flex justify-center items-center"
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

                    <>
                        <motion.button
                            initial={false}
                            animate={{
                                x: CAN_SHIFT_LEFT ? "0%" : "-100%",
                            }}
                            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
                            onClick={shiftLeft}
                        >
                            <FiChevronLeft />
                        </motion.button>
                        <motion.button
                            initial={false}
                            animate={{
                                x: CAN_SHIFT_RIGHT ? "0%" : "100%",
                            }}
                            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
                            onClick={shiftRight}
                        >
                            <FiChevronRight />
                        </motion.button>
                    </>
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
}

interface BrandStoryCardsProps {
    card: BrandStoryCard
}

const BrandStoryCards = ({ card }: BrandStoryCardsProps) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300  hover:-translate-y-2 w-[280px] flex-shrink-0 hover:shadow-2xl">
            <div className="overflow-hidden bg-slate-100 h-64   rounded-3xl">
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
