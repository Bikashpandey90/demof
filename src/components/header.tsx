import { useState } from "react"
import HamburgerIcon from "./hamburger"
import { useNavigate } from "react-router-dom"
import AnimatedMenu from "./AnimatedMenu/AnimatedMenu"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <header className="absolute left-0 top-0 w-full   bg-transparent sm:mt-0 mt-3 lg:mt-0 z-50 ">
            <div className=" lg:max-w-7xl xl:max-w-[1600px]  mx-auto  px-4 sm:px-6 lg:px py-3 lg:py-0 sm:py-0 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center  gap-3"
                    onClick={() => {
                        navigate('/')
                    }}>
                    <div className="w-[90px] p-2  lg:p sm:w-[150px] lg:w-[200px] md:w-[150px] h-auto sm:my-2 lg:mr-2 flex items-center justify-center">
                        <img
                            src="/momo.png"
                            alt="logo"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mr-2  z-50  mb-2 sm:mb-3 md:mb-4 hover:opacity-80 transition-opacity"
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon isOpen={isMenuOpen} />
                </button>

                {/* Menu Overlay */}
                <AnimatedMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                {/* <AnimatedMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
            </div>
        </header>
    )
}
