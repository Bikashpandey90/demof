import { useEffect, useRef, useState } from 'react'
import NeuButton from './button'
import { useInView } from 'react-intersection-observer'

export default function Liscense() {
    const certifications = [
        {
            id: 'haccp',
            name: 'HACCP',
            src: '/liscense/l1.svg'
        },
        {
            id: 'brc',
            name: 'BRC',
            src: '/liscense/l2.svg'
        },
        {
            id: 'iso',
            name: 'ISO 22000',
            src: '/liscense/l3.svg'
        },
        {
            id: 'halal',
            name: 'Halal',
            src: '/liscense/l4.svg'
        },
        {
            id: 'rspo',
            name: 'RSPO',
            src: '/liscense/l5.svg'
        },
    ]
    const [headingRevealed, setHeadingRevealed] = useState(false)
    const [descriptionRevealed, setDescriptionRevealed] = useState(false)
    const [certificationsRevealed, setCertificationsRevealed] = useState(false)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3 })
    const { ref: descriptionRef, inView: descriptionInView } = useInView({ threshold: 0.3 })
    const { ref: certificationsRef, inView: certificationsInView } = useInView({ threshold: 0.2 })

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsScrollingDown(currentScrollY > lastScrollY.current)
            lastScrollY.current = currentScrollY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    useEffect(() => {
        if (headingInView && isScrollingDown) setHeadingRevealed(true)
    }, [headingInView, isScrollingDown])
    useEffect(() => {
        if (descriptionInView && isScrollingDown) setDescriptionRevealed(true)
    }, [descriptionInView, isScrollingDown])
    useEffect(() => {
        if (certificationsInView && isScrollingDown) setCertificationsRevealed(true)
    }, [certificationsInView, isScrollingDown])

    return (
        <>
            <img
                src="/orange.svg"
                alt="Top irregular edge"
                className="bg-[#ececec]  w-full h-auto block scale-[1.2]  -mt-[1px] z-100 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />


            <section className="relative w-full bg-[#ececec] py-20 overflow-hidden">


                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2
                            ref={headingRef}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold text-black font-turbinado text-foreground mb-6 text-balance transition-all duration-1000"
                            style={{
                                opacity: headingRevealed ? 1 : 0,
                                transform: headingRevealed ? "translateY(0)" : "translateY(30px)",

                            }}
                        >
                            Food Safety
                        </h2>
                        <p
                            ref={descriptionRef}

                            className="text-lg lg:text-2xl text-muted-foreground text-black font-gothic max-w-3xl mx-auto leading-relaxed transition-all duration-1000"
                            style={{
                                opacity: descriptionRevealed ? 1 : 0,
                                transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                            }}
                        >

                            All our products meet the highest global food safety standards.We are also halal certified and certified RSPO.
                        </p>
                    </div>

                    <div
                        ref={certificationsRef}
                        className="flex flex-wrap justify-center items-center gap-8 md:gap-10 mb-12 transition-all duration-1000"
                        style={{
                            opacity: certificationsRevealed ? 1 : 0,
                            transform: certificationsRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDelay: "100ms",
                        }}
                    >
                        {certifications.map((cert) => (
                            <div key={cert.id} className="flex  items-center justify-center">
                                <img
                                    src={cert.src || "/placeholder.svg"}
                                    alt={`${cert.name} certification`}
                                    className="h-32 w-32  object-contain hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center"
                        style={{
                            opacity: certificationsRevealed ? 1 : 0,
                            transform: certificationsRevealed ? "translateY(0)" : "translateY(30px)",
                            transitionDelay: "100ms",

                        }}
                    >
                        <NeuButton shadow="#5CB12F" className="bg-[#5CB12F]  text-[#ececec]" color="#ececec">
                            View More
                        </NeuButton>
                    </div>
                </div>
            </section >

        </>
    )
}