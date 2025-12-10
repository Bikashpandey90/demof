import { NavLink } from "react-router-dom"
import { FaPinterest, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";



const NewFooter = () => {

    const [footerLogoRevealed, setFooterLogoRevealed] = useState(false)
    const [footerContentRevealed, setFooterContentRevealed] = useState(false)


    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: footerLogoRef, inView: footerLogoInView } = useInView({ threshold: 0.3 })
    const { ref: footerContentRef, inView: footerContentInView } = useInView({ threshold: 0.3 })


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
        if (footerLogoInView && isScrollingDown) setFooterLogoRevealed(true)
    }, [footerLogoInView, isScrollingDown])


    useEffect(() => {
        if (footerContentInView && isScrollingDown) setFooterContentRevealed(true)
    }, [footerContentInView, isScrollingDown])




    return (
        <footer className="w-full bg-[#ff8000] relative overflow ">

            {/* <div className="bg-[url('/paper-bg2.png')] bg-cover bg-center  sm:bg-cover flex items-center justify-center translate-y-[-70px] -z-10 py-20 sm:py-12">
                <img
                    ref={imageRef}
                    src="/ourbetter2.png"
                    className="h-[100%] w-[100%] sm:h-[80%] sm:w-[80%] mt-10 p-4 sm:p-16 md:p-24 self-center justify-self-center transition-all duration-1000 "
                    style={{
                        opacity: imageRevealed ? 1 : 0,
                        transform: imageRevealed ? "translateY(0)" : "translateY(30px)",
                    }}
                />
            </div> */}
            <div className="w-full ">
                <div className="h-[12px] w-full bg-[#249F95]"></div>
                <div className="h-[12px] w-full bg-[#D32F2F]"></div>
            </div>




            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">

                <div className="flex justify-center mb-8 transition-all duration-1000"
                    ref={footerLogoRef}
                    style={{
                        opacity: footerLogoRevealed ? 1 : 0,
                        transform: footerLogoRevealed ? "translateY(0)" : "translateY(30px)",
                    }}
                >
                    <img src='momo.png' alt='MOMOGUYS Logo' className="h-32 w-auto hover:animate-bounce-custom z-50" />

                </div>

                <div className="flex justify-center gap-6 mb-12 transition-all duration-1000"
                    ref={footerContentRef}
                    style={{
                        opacity: footerContentRevealed ? 1 : 0,
                        transform: footerContentRevealed ? "translateY(0)" : "translateY(30px)",
                    }}
                >
                    <a href="#facebook" className="text-white hover:text-red-600 transition-colors" aria-label="Facebook">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="#instagram" className="text-white hover:text-red-600 transition-colors" aria-label="Instagram">
                        <FaInstagram size={24} />
                    </a>
                    <a href="#twitter" className="text-white hover:text-red-600 transition-colors" aria-label="Twitter">
                        <FaXTwitter size={24} />
                    </a>
                    <a href="#pinterest" className="text-white hover:text-red-600 transition-colors" aria-label="Pinterest">
                        <FaPinterest size={24} />

                    </a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-center mb-4 text-xl font-semibold text-white font-brando transition-all duration-1000"
                    ref={footerContentRef}
                    style={{
                        opacity: footerContentRevealed ? 1 : 0,
                        transform: footerContentRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "200ms",
                    }}
                >
                    <NavLink to="/contact" className="hover:text-red-600 transition-colors">
                        CONTACT US
                    </NavLink>
                    <span className="text-gray-300">|</span>
                    <NavLink to="/terms" className="hover:text-red-600 transition-colors">
                        TERMS & CONDITIONS
                    </NavLink>
                    <span className="text-gray-300">|</span>
                    <NavLink to="/privacy" className="hover:text-red-600 transition-colors">
                        PRIVACY POLICY
                    </NavLink>
                    <span className="text-gray-300">|</span>
                    <NavLink to="/accessibility" className="hover:text-red-600 transition-colors">
                        ACCESSIBILITY STATEMENT
                    </NavLink>
                    <span className="text-gray-300">|</span>
                    <NavLink to="/faq" className="hover:text-red-600 transition-colors">
                        FAQ
                    </NavLink>
                </div>

                <div className="text-center mb-4 transition-all duration-1000"
                    ref={footerContentRef}
                    style={{
                        opacity: footerContentRevealed ? 1 : 0,
                        transform: footerContentRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "300ms",
                    }}
                >
                    <button className="text-sm font-semibold font-brando text-white hover:text-red-600 transition-colors">
                        COOKIE PREFERENCES
                    </button>
                </div>


                <div className="text-center text-lg  text-white transition-all duration-1000"

                    ref={footerContentRef}
                    style={{
                        opacity: footerContentRevealed ? 1 : 0,
                        transform: footerContentRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "300ms",
                    }}>
                    <p>© 2025 MOMO GUYS Karnatakka, India, Inc.</p>
                </div>
            </div>
        </footer>
    )
}
export default NewFooter
