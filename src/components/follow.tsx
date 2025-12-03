"use client"

import { useRef } from "react"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import NeuButton from "./buttons/neu"

export default function FollowUs() {
    const posts = [
        { id: 1, image: "/posts/download.jpeg" },
        { id: 2, image: "/posts/bags.jpeg" },
        { id: 3, image: "/posts/pot.jpeg" },
        { id: 4, image: "/posts/drink.jpeg" },
        { id: 5, image: "/posts/mug.jpeg" },
        { id: 6, image: "/posts/download.jpeg" },

    ]

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
        <div className="bg-[#C6211D] w-full m-0 p-0 min-w-screen overflow-x-hidden">
            <img
                src="/newblue.svg"
                alt="Top irregular edge"
                className="bg-transparent w-full scale-125 h-auto block z-100 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="bg-[#249F95] py-8 sm:py-12 md:py-16 relative overflow ">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2
                        ref={headingRef}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight sm:leading-snug md:leading-normal lg:leading-[96px] font-script text-white text-center mb-4 sm:mb-6 md:mb-8 drop-shadow-lg font-turbinado transition-all duration-1000"
                        style={{
                            opacity: headingRevealed ? 1 : 0,
                            transform: headingRevealed ? "translateY(0)" : "translateY(30px)",
                        }}
                    >
                        Follow us
                    </h2>

                    <p
                        ref={descriptionRef}
                        className="text-white text-center text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8 font-gothic font-bold mb-3 sm:mb-4 transition-all duration-1000"
                        style={{
                            opacity: descriptionRevealed ? 1 : 0,
                            transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDelay: "100ms",
                        }}
                    >
                        Take a moment and check out our social.
                    </p>

                    <p
                        className="text-white text-center mb-8 sm:mb-10 md:mb-16 font-gothic font-bold text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8 transition-all duration-1000"
                        style={{
                            opacity: descriptionRevealed ? 1 : 0,
                            transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDelay: "200ms",
                        }}
                    >
                        If you're grabbing a quick lunch at work, or snacking on a delicious pot
                        <br />
                        on the go, share your experiences with us and join the community.
                    </p>

                    <div
                        className="flex justify-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000"
                        style={{
                            opacity: descriptionRevealed ? 1 : 0,
                            transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDelay: "300ms",
                        }}
                    >
                        {/* <NeuButton shadow="#DFBF0E" className="bg-[#DFBF0E]  text-white" color="#249F95">
                            CONNECT
                        </NeuButton> */}
                        <NeuButton text="Connect" />
                    </div>

                    <div
                        ref={postsContainerRef}
                        className="transition-all duration-1000"
                        style={{
                            opacity: postsRevealed ? 1 : 0,
                            transform: postsRevealed ? "translateY(0)" : "translateY(30px)",
                        }}
                    >
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-3 max-w-4xl mx-auto">
                            {posts.map((post) => (
                                <div key={post.id} className="relative overflow-hidden rounded-sm">
                                    <img
                                        src={post.image || "/placeholder.svg"}
                                        alt="Social post"
                                        className="w-full aspect-square object-cover shadow-lg pointer-events-none hover:scale-105 transition-transform duration-300"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <img
                src="/orange.svg"
                alt="Top irregular edge"
                className="bg-[#ececec] max-w-none min-w-full z-100 pointer-events-none"
                style={{ display: "block", width: "100%", height: "auto", margin: 0, padding: 0, lineHeight: 0 }}
            />

        </div>
    )
}
