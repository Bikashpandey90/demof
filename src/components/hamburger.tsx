"use client"

interface HamburgerIconProps {
    isOpen: boolean
}

export default function HamburgerIcon({ isOpen }: HamburgerIconProps) {
    return (
        <div className="w-30 h-30 flex flex-col bg-transparent  justify-center items-center gap-2 cursor-pointer">
            <div
                className="w-[50px] h-2 bg-white  transition-all duration-300 origin-center"
                style={{
                    transform: isOpen ? "rotate(45deg) translate(10px, 10px)" : "rotate(0deg)",
                }}
            />
            <div
                className="w-[50px] h-2 bg-white  transition-all duration-300"
                style={{
                    opacity: isOpen ? 0 : 1,
                }}
            />
            <div
                className="w-[50px] h-2 bg-white  transition-all duration-300 origin-center"
                style={{
                    transform: isOpen ? "rotate(-45deg) translate(12px, -12px)" : "rotate(0deg)",
                }}
            />
        </div>
    )
}
