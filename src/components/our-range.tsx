"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import { ProductDetail } from "./producthero"
import productSvc from "@/services/product.service"
import categorySvc, { CategoryData } from "@/services/category.service"
import { useNavigate } from "react-router-dom"

interface OurRangeProps {
    activeCategory?: string | null
}

export default function OurRange({ activeCategory }: OurRangeProps) {

    const [categories, setCategories] = useState<CategoryData[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory || null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [products, setProducts] = useState<ProductDetail[]>([])
    const navigate = useNavigate()

    const [headingRevealed, setHeadingRevealed] = useState(false)
    const [descriptionRevealed, setDescriptionRevealed] = useState(false)
    const [sliderRevealed, setSliderRevealed] = useState(false)
    const [categoriesRevealed, setCategoriesRevealed] = useState(false)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3 })
    const { ref: descriptionRef, inView: descriptionInView } = useInView({ threshold: 0.3 })
    const { ref: sliderContainerRef, inView: sliderInView } = useInView({ threshold: 0.2 })
    const { ref: categoriesRef, inView: categoriesInView } = useInView({ threshold: 0.3 })

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
        if (sliderInView && isScrollingDown) setSliderRevealed(true)
    }, [sliderInView, isScrollingDown])

    useEffect(() => {
        if (categoriesInView && isScrollingDown) setCategoriesRevealed(true)
    }, [categoriesInView, isScrollingDown])

    useEffect(() => {
        if (activeCategory) {
            setSelectedCategory(activeCategory)
        }
    }, [activeCategory])


    // Drag logic
    const handleMouseDown = (e: React.MouseEvent) => {
        const slider = sliderRef.current
        if (!slider) return

        slider.classList.add("grabbing")
        const startX = e.pageX - slider.offsetLeft
        const scrollLeft = slider.scrollLeft

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const x = moveEvent.pageX - slider.offsetLeft
            const walk = (x - startX) * 1.5
            slider.scrollLeft = scrollLeft - walk
        }

        const handleMouseUp = () => {
            slider.classList.remove("grabbing")
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
    }

    // Filter products based on selected category
    const filteredProducts = selectedCategory ? products.filter((p) => p.category?.title === selectedCategory) : products

    // Close dropdown on click outside
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category)
        setIsDropdownOpen(false)
    }

    const fetchProducts = async () => {
        try {
            const response = await productSvc.getAllProducts()
            setProducts(response.data.detail)
            console.log(response.data.detail)

        } catch (exception) {
            throw exception
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await categorySvc.getAllCategory()
            setCategories(response.detail)

        } catch (exception) {
            throw exception
        }
    }
    useEffect(() => {
        fetchProducts(),
            fetchCategories()
    }, [])

    return (
        <section className="bg-[#C6211D] py-8 md:py-16 relative overflow justify-center items-center flex">
            <div className="w-full mx-auto max-w-7xl">
                <h2
                    ref={headingRef}
                    className="text-5xl md:text-7xl leading-[3rem] md:leading-[6rem] font-bold text-white text-center mb-4 md:mb-8 drop-shadow-lg font-turbinado transition-all duration-1000"
                    style={{
                        opacity: headingRevealed ? 1 : 0,
                        transform: headingRevealed ? "translateY(0)" : "translateY(30px)",
                    }}
                >
                    Our delicious range
                </h2>

                <p
                    ref={descriptionRef}
                    className="text-white text-center text-sm sm:text-lg md:text-2xl mb-3 md:mb-4 font-gothic leading-6 md:leading-9 font-bold px-4 transition-all duration-1000"
                    style={{
                        opacity: descriptionRevealed ? 1 : 0,
                        transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "100ms",
                    }}
                >
                    All of our products are stored in your local
                    supermarket's freezer in various flavours.
                </p>

                <p
                    className="text-white text-center text-sm sm:text-lg md:text-2xl mb-8 md:mb-16 font-bold font-gothic leading-6 md:leading-9 px-4 transition-all duration-1000"
                    style={{
                        opacity: descriptionRevealed ? 1 : 0,
                        transform: descriptionRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "200ms",
                    }}
                >
                    Enjoy India's most loved delicious flavours of Momoguy's momo in your home,
                    <br /> prepared in minutes.
                </p>

                <div className="md:hidden px-4 mb-4 relative mx-14 z-20">
                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={handleDropdownToggle}
                            className="w-full px-6 py-2 font-quicksand text-2xl border-2 border-[#D63D29] bg-white text-[#D63D29] rounded-3xl  transition-all shadow-[4px_4px_0px_#D63D29] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-between uppercase tracking-wider"
                        >
                            {selectedCategory || "Select Category"}
                            <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 bg-white rounded-3xl mt-2 border-2 border-[#D63D29] overflow-hidden">
                                {categories.map((category, index) => (
                                    <button
                                        key={category._id}
                                        onClick={() => handleCategorySelect(category?.title)}
                                        className={`w-full text-left px-6 py-2 font-quicksand text-lg transition-all uppercase tracking-wider border-2 ${selectedCategory === category?.title
                                            ? "bg-[#D63D29] text-white border-[#D63D29]"
                                            : "bg-white text-[#D63D29] border-white hover:bg-gray-50"
                                            } ${index === 0 ? "rounded-t-xl" : ""} ${index === categories.length - 1 ? "rounded-b-xl" : ""}`}
                                    >
                                        {category?.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    ref={sliderContainerRef}
                    style={{
                        opacity: sliderRevealed ? 1 : 0,
                        transform: sliderRevealed ? "translateY(0)" : "translateY(30px)",
                        transition: "all 1000ms",
                    }}
                >
                    <div
                        ref={sliderRef}
                        onMouseDown={handleMouseDown}
                        className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none pb-6 md:pb-8 mb-8 md:mb-12"
                    >
                        <div className="flex gap-4 md:gap-6 px-4 md:px-8 w-max overflow">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="flex flex-col  items-center flex-shrink-0">
                                    <div
                                        className="
        w-32 h-48 md:w-[220px] md:h-80
        flex items-center justify-center
        transition-all duration-300 ease-out
        active:scale-95
    "
                                        onClick={() => navigate("/products/" + product.slug)}
                                    >
                                        <img
                                            src={product?.images?.[0]?.url ?? "/placeholder.svg"}
                                            alt={product.name}
                                            className={`h-48 md:h-80 w-auto object-cover pointer-events-none
                                                ${sliderRevealed ? 'product-bounce' : ''}
                                                `}
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    ref={categoriesRef}
                    className="px-4 md:px-8 transition-all duration-1000"
                    style={{
                        opacity: categoriesRevealed ? 1 : 0,
                        transform: categoriesRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "100ms",
                    }}
                >
                    <div className="hidden md:flex justify-center gap-6 md:gap-12">
                        {categories.map((category) => (
                            <button
                                key={category._id}
                                onClick={() => setSelectedCategory(selectedCategory === category?.title ? null : category.title)}
                                className="px-6 py-2 font-quicksand text-2xl border-2 border-[#D63D29] bg-[#D63D29] text-white rounded-3xl w-fit transition-all shadow-[4px_4px_0px_#D63D29] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] uppercase tracking-wider"
                                style={{
                                    ...(selectedCategory === category?.title && {
                                        backgroundColor: "white",
                                        color: "#D63D29",
                                    }),
                                }}
                            >
                                {category?.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
