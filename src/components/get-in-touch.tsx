"use client"

import { useInView } from "react-intersection-observer"
import { useState, useEffect, useRef } from "react"
import NeuButton from "./button"

export default function GetInTouch() {
    const [headingRevealed, setHeadingRevealed] = useState(false)
    const [paragraphRevealed, setParagraphRevealed] = useState(false)
    const [buttonRevealed, setButtonRevealed] = useState(false)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3 })
    const { ref: paragraphRef, inView: paragraphInView } = useInView({ threshold: 0.3 })
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
        if (headingInView && isScrollingDown) setHeadingRevealed(true)
    }, [headingInView, isScrollingDown])

    useEffect(() => {
        if (paragraphInView && isScrollingDown) setParagraphRevealed(true)
    }, [paragraphInView, isScrollingDown])

    useEffect(() => {
        if (buttonInView && isScrollingDown) setButtonRevealed(true)
    }, [buttonInView, isScrollingDown])

    return (
        <>
            <img
                src="/red-top.svg"
                alt="Top irregular edge"
                className="bg-[#ff8000] w-full h-auto block  -mt-[1px] z-100 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
            <section className="relative w-full overflow-hidden">
                {/* Orange section */}
                <div className="bg-[#C6211D] py-8 relative z-0">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <h2
                                ref={headingRef}
                                className="text-[80px] leading-[96px] font-script text-white font-turbinado mb-12 drop-shadow-lg transition-all duration-1000"
                                style={{
                                    opacity: headingRevealed ? 1 : 0,
                                    transform: headingRevealed ? "translateY(0)" : "translateY(30px)",
                                }}
                            >
                                Get in touch
                            </h2>

                            <p
                                ref={paragraphRef}
                                className="text-white text-2xl leading-8 mb-12 font-bold font-gothic transition-all duration-1000"
                                style={{
                                    opacity: paragraphRevealed ? 1 : 0,
                                    transform: paragraphRevealed ? "translateY(0)" : "translateY(30px)",
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
                                ref={buttonRef}
                                style={{
                                    opacity: buttonRevealed ? 1 : 0,
                                    transform: buttonRevealed ? "translateY(0)" : "translateY(30px)",
                                    transition: "all 1000ms",
                                    transitionDelay: "200ms",
                                }}
                            >
                                {/* <NeuButton color="#C6211D"> */}
                                <NeuButton shadow="#FF8A15" className="bg-[#FF8A15]  text-white" color="#C6211D">


                                    CONTACT US</NeuButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <img
                src="/red.svg"
                alt="Bottom irregular edge"
                className=" bg-transparent w-full h-auto block -mb-[1px] z-30 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />
        </>
    )
}
