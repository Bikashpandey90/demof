"use client"

import { motion } from "framer-motion"
import { ArrowRightIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import useMeasure from "react-use-measure"
import IngridientTop from "./svg/ingridientTop"
import { useNavigate } from "react-router-dom"
import { useInView } from "react-intersection-observer"

const CARD_WIDTH = 350
const MARGIN = 20
const CARD_SIZE = CARD_WIDTH + MARGIN

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
}

const CardCarousel = () => {
    const [ref, { width }] = useMeasure()
    const [offset, setOffset] = useState(0)

    const CARD_BUFFER = width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1

    const CAN_SHIFT_LEFT = offset < 0

    const CAN_SHIFT_RIGHT = Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER)

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

    return (
        <>

            <div className="relative w-full "
                style={{ backgroundColor: '#ececec' }}
            >
                <IngridientTop
                    color={'#ff8000'}
                />
            </div>

            <section className="bg-[#ff8000] " ref={ref}>
                <div className="relative overflow-hidden p-4 ">
                    <div className="mx-auto max-w-6xl lg:my-16">
                        <p className="mb-4 font-semibold text-white text-center font-turbinado text-8xl leading-[96px] transition-all duration-1000"
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
                            className="flex gap-5 lg:gap-8 mb-10 cursor-grab active:cursor-grabbing select-none transition-all duration-1000"
                            ref={postsContainerRef}
                            style={{
                                opacity: postsRevealed ? 1 : 0,
                                transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "300ms",
                            }}

                        >

                            {items.map((item) => {
                                return <Card key={item.id} {...item} />
                            })}
                        </motion.div>
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
            </section >
        </>
    )
}


const Card = ({ url, title, description }: ItemType) => {
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()

    return (
        <div
            className="group flex flex-col h-full  rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[250px] lg:w-[420px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden h-56 bg-muted">
                <img
                    src={url || "/placeholder.svg"}
                    alt={title}
                    draggable={false}
                    className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"
                        }`}

                />
                <div className="absolute top-4 left-4">
                    {/* <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {category}
                    </span> */}
                </div>
            </div>

            <div className="flex flex-col flex-grow p-5"

            >

                <h3 className="text-lg font-gothic  font-bold mb line-clamp-2 text-card-foreground group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-muted-foreground mb-2 line-clamp-3 flex-grow font-gothic">{description}</p>

                {/* <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        <span className="font-gothic">{date}</span>
                    </div>
                    <span className="px-2 py-1 bg-muted rounded font-gothic">{readTime}</span>
                </div> */}

                <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors"
                    onClick={() => {
                        navigate('/blogs')

                    }}>
                    <span className="font-gothic">Read more</span>
                    <ArrowRightIcon
                        size={16}
                        className={`ml-2 -rotate-45 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardCarousel

type ItemType = {
    id: number
    url: string
    category: string
    title: string
    description: string
    date: string
    readTime: string
}

const items: ItemType[] = [
    {
        id: 1,
        title: "Getting Started with Next.js 16",
        description:
            "Learn the fundamentals of Next.js 16 and how to build modern web applications with React Server Components.",
        category: "Next.js",
        date: "Nov 15, 2025",
        readTime: "5 min read",
        url: "/posts/mug.jpeg",
    },
    {
        id: 2,
        title: "Mastering TypeScript for React",
        description: "Deep dive into TypeScript best practices when building React components and managing complex state.",
        category: "TypeScript",
        date: "Nov 10, 2025",
        readTime: "8 min read",
        url: "/posts/pot.jpeg",
    },
    {
        id: 3,
        title: "Tailwind CSS Tips and Tricks",
        description:
            "Discover advanced Tailwind CSS techniques to create responsive and beautiful user interfaces efficiently.",
        category: "CSS",
        date: "Nov 5, 2025",
        readTime: "6 min read",
        url: "/posts/drink.jpeg",
    },
    {
        id: 4,
        title: "Building Performant Web Apps",
        description:
            "Optimize your Next.js application with image optimization, code splitting, and smart caching strategies.",
        category: "Performance",
        date: "Oct 28, 2025",
        readTime: "7 min read",
        url: "/posts/download.jpeg",
    },
    {
        id: 5,
        title: "Database Design Patterns",
        description: "Explore essential database patterns and architecture decisions for building scalable applications.",
        category: "Database",
        date: "Oct 20, 2025",
        readTime: "9 min read",
        url: "/posts/bags.jpeg",
    },
    {
        id: 6,
        title: "React Server Components Explained",
        description:
            "Understand the power of React Server Components and how they can improve your application performance.",
        category: "React",
        date: "Oct 15, 2025",
        readTime: "6 min read",
        url: "/posts/mug.jpeg",
    },
]
