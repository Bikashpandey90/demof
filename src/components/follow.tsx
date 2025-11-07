"use client"

import type React from "react"

import { useState, useRef } from "react"
import NeuButton from "./button"

export default function FollowUs() {
    const posts = [
        { id: 1, image: "/posts/download.jpeg" },
        { id: 2, image: "/posts/download (1).jpeg" },
        { id: 3, image: "/posts/download (2).jpeg" },
        { id: 4, image: "/posts/download (3).jpeg" },
        { id: 5, image: "/posts/download (4).jpeg" },
    ]

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isScrolling, setIsScrolling] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsScrolling(true)
        setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
    }

    const handleMouseLeave = () => {
        setIsScrolling(false)
    }

    const handleMouseUp = () => {
        setIsScrolling(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isScrolling || !scrollContainerRef.current) return
        e.preventDefault()
        const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 1.5
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsScrolling(true)
        setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0))
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isScrolling || !scrollContainerRef.current) return
        const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 1.5
        scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div className="bg-[#C6211D]">
            <img
                src="/blue.svg"
                alt="Top irregular edge"
                className="bg-transparent w-full scale-125 h-auto block z-100 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="bg-[#249F95] py-8 sm:py-12 md:py-16 relative overflow-hidden">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight sm:leading-snug md:leading-normal lg:leading-[96px] font-script text-white text-center mb-4 sm:mb-6 md:mb-8 drop-shadow-lg font-turbinado">
                        Follow us
                    </h2>

                    <p className="text-white text-center text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8 font-gothic font-bold mb-3 sm:mb-4">
                        Take a moment and check out our social.
                    </p>

                    <p className="text-white text-center mb-8 sm:mb-10 md:mb-12 font-gothic font-bold text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8">
                        If you're grabbing a quick lunch at work, or snacking on a delicious pot
                        <br />
                        on the go, share your experiences with us and join the community.
                    </p>

                    <div className="flex justify-center mb-8 sm:mb-12 md:mb-16">
                        <NeuButton color={"#249F95"}>CONNECT</NeuButton>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={() => setIsScrolling(false)}
                        className="pb-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none scroll-smooth"
                    >
                        <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center min-w-max px-4">
                            {posts.map((post) => (
                                <div key={post.id} className="relative flex-shrink-0">
                                    <img
                                        src={post.image || "/placeholder.svg"}
                                        alt="Social post"
                                        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover shadow-lg pointer-events-none"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
