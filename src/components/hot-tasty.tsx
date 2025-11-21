"use client"

import { useInView } from "react-intersection-observer"
import { useState, useEffect, useRef } from "react"

export default function HotTastyConvenient() {
    const [headingRevealed, setHeadingRevealed] = useState(false)
    const [paragraphRevealed, setParagraphRevealed] = useState(false)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3 })
    const { ref: paragraphRef, inView: paragraphInView } = useInView({ threshold: 0.3 })

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
        if (paragraphInView && isScrollingDown) setParagraphRevealed(true)
    }, [paragraphInView, isScrollingDown])

    return (
        <>
            <section className="relative w-full overflow-hidden">
                <div className="bg-[#FF8000] py-8 md:py-16 relative z-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                            <div>
                                <h2
                                    ref={headingRef}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-10 font-bold font-brando text-white mb-4 md:mb-8 drop-shadow-lg transition-all duration-1000"
                                    style={{
                                        opacity: headingRevealed ? 1 : 0,
                                        transform: headingRevealed ? "translateY(0)" : "translateY(30px)",
                                    }}
                                >
                                    STEAMY, HOT,
                                    <br />
                                    AND TASTY SNACK
                                </h2>

                                <p
                                    ref={paragraphRef}
                                    className="text-base sm:text-lg md:text-2xl leading-6 md:leading-8 font-bold font-gothic text-white transition-all duration-1000"
                                    style={{
                                        opacity: paragraphRevealed ? 1 : 0,
                                        transform: paragraphRevealed ? "translateY(0)" : "translateY(30px)",
                                        transitionDelay: "100ms",
                                    }}
                                >
                                    Whether you're looking for a quick and delicious snack to satisfy your hunger after work or a meeting,
                                    Momoguy's chef-driven momo provides an unparalleled flavour that will fill you with tasty goodness in
                                    less than 7 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <img
                src="/bg-header-bottom.png"
                alt="Bottom irregular edge"
                className=" bg-[#C6211D] w-full h-auto block -mb-[1px]  z-10 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
        </>
    )
}
