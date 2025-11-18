"use client"

import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer"
import NeuButton from "./button";
import productSvc from "@/services/product.service";
import { useEffect, useState, useRef } from "react";

export interface ProductDetail {
    nutritionalInfo: NutritionalInfo;
    _id: string;
    name: string;
    slug: string;
    category: {
        title: string
    }
    allergyAdvice: string;
    vegNonVeg: string;
    ingridients: string;
    tagline: string;
    images: string[];
    directionImages: DirectionImage[];
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface NutritionalInfo {
    header: string;
    rows: NutritionalRow[];
    footer: string;
    links: any[];
}

export interface NutritionalRow {
    values: string;
    perValue: string;
    perPacket: string;
    _id: string;
}

export interface DirectionImage {
    url: string;
    description: string;
    _id: string;
}

const SampleProduct = {
    image: ['/bluepro.png'],
    catgory: {
        title: 'Mug Shot Sachets'
    },
    vegNonveg: 'veg',
    name: 'Salt & Pepper Chilli Beef Flavour Noodles',
    tagline: 'Dried ribbon noodles in a spicy, salt and pepper beef flavour sauce with red and green pepper.',
    ingridients: 'Semolina, EGG White, Salt,Maltodextrin, Potato Starch, Natural Flavourings  WHEAT, Garlic Powder, Onion Powder, Sugar, Ground Paprika, Dried Red Pepper, Dried Green Pepper, Salt, Ground Black Pepper, Ground Ginger, BARLEY Malt Extract, Chinese Five Spice[Salt, Star Anise, Sugar, Onion Powder, Garlic Powder, Black Pepper, Cinnamon, Clove, Fennel Seed,Ginger], Dried Jalapeno Pepper, Ground Cayenne.',
    allergyAdvice: ' Also, may contain milk, soya, mustard and other gluten sources.',
    nutritionalInfo: {
        header: ' Once boiling water has been added to this pot it weighs 268g (approx.). This represents one serving. Allvalues below relate to the product when made up with water(i.e.per 100g is a portion of the 268g serving).',
        footer: '* Reference Intake of an average adult(8400kJ / 2000kcal)',
        rows: [
            { values: 'Energy', perValue: '100g', perPacket: '0.3g' },
            { values: 'Fat', perValue: '100g', perPacket: '0.3g' },
            { values: 'Carbohydrate', perValue: '100g', perPacket: '0.3g' },
            { values: 'Energy', perValue: '100g', perPacket: '0.3g' },
            { values: 'Fat', perValue: '100g', perPacket: '0.3g' },
            { values: 'Carbohydrate', perValue: '100g', perPacket: '0.3g' },
        ]
    },
    directionImages: [
        { url: '/directions/empty.svg' },
        { url: '/directions/fill.svg' },
        { url: '/directions/stir.svg' },
        { url: '/directions/enjoy.svg' }
    ]

}

console.log(SampleProduct)

export default function ProductHero() {
    const [product, setProduct] = useState<ProductDetail>()

    const [imageRevealed, setImageRevealed] = useState(false)
    const [contentRevealed, setContentRevealed] = useState(false)
    const [buttonRevealed, setButtonRevealed] = useState(false)
    const [badgesRevealed, setBadgesRevealed] = useState(false)
    const [ingredientsRevealed, setIngredientsRevealed] = useState(false)
    const [directionsRevealed, setDirectionsRevealed] = useState(false)

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.3 })
    const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.3 })
    const { ref: buttonRef, inView: buttonInView } = useInView({ threshold: 0.3 })
    const { ref: badgesRef, inView: badgesInView } = useInView({ threshold: 0.3 })
    const { ref: ingredientsRef, inView: ingredientsInView } = useInView({ threshold: 0.3 })
    const { ref: directionsRef, inView: directionsInView } = useInView({ threshold: 0.3 })

    const { slug } = useParams() ?? {}

    console.log(slug)

    const fetchProductDetail = async () => {
        try {
            const response = await productSvc.fetchProductBySlug(slug as string)
            setProduct(response.detail)
            console.log(response.detail)
        } catch (exception) {
            console.log(exception)
        }
    }

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
        if (imageInView && isScrollingDown) setImageRevealed(true)
    }, [imageInView, isScrollingDown])

    useEffect(() => {
        if (contentInView && isScrollingDown) setContentRevealed(true)
    }, [contentInView, isScrollingDown])

    useEffect(() => {
        if (buttonInView && isScrollingDown) setButtonRevealed(true)
    }, [buttonInView, isScrollingDown])

    useEffect(() => {
        if (badgesInView && isScrollingDown) setBadgesRevealed(true)
    }, [badgesInView, isScrollingDown])

    useEffect(() => {
        if (ingredientsInView && isScrollingDown) setIngredientsRevealed(true)
    }, [ingredientsInView, isScrollingDown])

    useEffect(() => {
        if (directionsInView && isScrollingDown) setDirectionsRevealed(true)
    }, [directionsInView, isScrollingDown])

    useEffect(() => {
        fetchProductDetail()
    }, [slug])

    return (
        <>
            <main className="min-h-screen bg-[#416BA9] flex items-center justify-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12   justify-items-center mt-16 sm:mt-0 lg:px-2 py-2 lg:py-0 items-center max-w-7xl mx-auto ">
                    <div
                        ref={imageRef}
                        className="flex justify-center lg:justify-start mt-2 px-6 order-1 lg:order-1 transition-all duration-1000"
                        style={{
                            opacity: imageRevealed ? 1 : 0,
                            transform: imageRevealed ? "translateX(0)" : "translateX(-100px)",
                        }}
                    >
                        <div className="relative w-full lg:max-w-[500px]">
                            <img
                                src="/bluepro.png"
                                alt="Mug Shot Salt & Pepper Chilli Beef Noodles"
                                width={400}
                                height={600}
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 order-2 justify-center items-center px-6 py-0 lg:py-20 mt-2 lg:mt-40 lg:order-2">

                        <div
                            ref={contentRef}
                            className="transition-all duration-1000"
                            style={{
                                opacity: contentRevealed ? 1 : 0,
                                transform: contentRevealed ? "translateX(0)" : "translateX(100px)",
                            }}
                        >
                            <p className="lg:mt-3 mt-0 text-white text-[20px] leading-[24px] lg:text-[27px] lg:leading-[30px] text-center uppercase font-gothic font-semibold mb-2">
                                Mug Shot Sachets
                            </p>
                            <h1 className="text-[32px] leading-9 drop-shadow-lg lg:text-[50px] lg:mt-4 max-w-[320px] sm:max-w-full mt-2 text-center lg:leading-[60px] font-bold font-brando text-[#172538] text-balance">
                                Salt & Pepper Chilli Beef Flavour Noodles
                            </h1>
                        </div>

                        <p
                            className="text-sm leading-[15px] lg:text-xl lg:leading-[22px] mb-6 text-white max-w-[300px] lg:max-w-xl mt lg:mt-4 font-gothic text-center transition-all duration-1000"
                            style={{
                                opacity: contentRevealed ? 1 : 0,
                                transform: contentRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "100ms",
                            }}
                        >
                            Dried ribbon noodles in a spicy, salt and pepper beef flavour sauce with red and green pepper.
                        </p>

                        <div
                            ref={buttonRef}
                            className="transition-all duration-1000"
                            style={{
                                opacity: buttonRevealed ? 1 : 0,
                                transform: buttonRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "200ms",
                            }}
                        >
                            <NeuButton shadow="#172538" className="bg-[#172538] text-[#416BA9]" color="#416BA9">
                                Buy It Now
                            </NeuButton>
                        </div>

                        <div
                            ref={badgesRef}
                            className="flex items-center justify-center lg:justify-between w-[350px] py-5 lg:py-0 lg:w-[500px] h-24 mt-4 lg:mt-10 px-0 lg:px-5 overflow transition-all duration-1000"
                            style={{
                                opacity: badgesRevealed ? 1 : 0,
                                transform: badgesRevealed ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "300ms",
                            }}
                        >
                            <img src="/product/natural.svg" className="h-full" />
                            <div className="w-[.5px] h-full bg-white mx-4"></div>
                            <img src="/product/no-artificial.svg" className="h-full" />
                        </div>

                    </div>
                </div>
            </main>

            <div className="relative bg-[#416BA9] w-full ">
                <img src="/product/ingridientTop.svg" className="w-full h-full scale-[1.1]" />
            </div>

            <div
                className="bg-[#172538] flex justify-center items-center w-full mx-auto pb-24 lg:pb-0 transition-all duration-1000"

            >
                <div className="grid grid-cols-1 lg:grid-cols-2 mx-8 lg:mx-0 max-w-7xl gap-12 lg:gap-20 transition-all duration-1000"
                    ref={ingredientsRef}
                    style={{
                        opacity: ingredientsRevealed ? 1 : 0,
                        transform: ingredientsRevealed ? "translateY(0)" : "translateY(30px)",
                    }}>
                    <div>
                        <h2 className="text-3xl lg:text-[40px] leading-[36px] lg:leading-[48px] font-brando font-bold text-[#416BA9] mb-3 uppercase ">Ingredients</h2>

                        <div className="space-y-6 text-white"

                        >
                            <p className=" text-lg lg:mt-0 lg:text-2xl leading-[22px] lg:leading-[26px]  mt-6 font-gothic  ">
                                <span className="font-extrabold">INGREDIENTS</span> Dried Noodles [Durum{" "}
                                <span className="font-bold">WHEAT</span> Semolina, <span className="font-bold">EGG</span> White, Salt],
                                Maltodextrin, Potato Starch, Natural Flavourings (contain <span className="font-bold">WHEAT</span>),
                                Garlic Powder, Onion Powder, Sugar, Ground Paprika, Dried Red Pepper, Dried Green Pepper, Salt, Ground
                                Black Pepper, Ground Ginger, <span className="font-bold">BARLEY</span> Malt Extract, Chinese Five Spice
                                [Salt, Star Anise, Sugar, Onion Powder, Garlic Powder, Black Pepper, Cinnamon, Clove, Fennel Seed,
                                Ginger], Dried Jalapeno Pepper, Ground Cayenne.
                            </p>

                            <div className="space-y-1 text-lg leading-[22px] pt-2 font-gothic lg:text-2xl lg:leading-[26px]">
                                <p className="font-bold ">ALLERGY ADVICE:</p>
                                <p className="">
                                    For allergens, including cereals containing gluten, see ingredients in{" "}
                                    <span className="font-bold">BOLD</span>
                                </p>
                                <p className="">
                                    Also, may contain milk, soya, mustard and other gluten sources.
                                </p>
                            </div>

                            <p className="font-bold font-gothic text-lg leading-[22px]  lg:text-2xl lg:leading-[26px] ">Suitable for {product?.vegNonVeg === 'veg' ? 'Vegetarians' : 'Non-Vegeterians'}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl leading-[36px] lg:text-[40px] lg:leading-[48px] font-brando  text-[#416BA9] font-bold  mb-3 uppercase ">
                            Nutritional Information
                        </h2>

                        <div className="space-y-6  text-white">
                            <p className="text-lg  leading-5 font-gothic">
                                Once boiling water has been added to this pot it weighs 268g (approx.). This represents one serving. All
                                values below relate to the product when made up with water (i.e. per 100g is a portion of the 268g
                                serving).
                            </p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 pb font-gothic ">
                                    <div>
                                        <p className="font-bold text-[22px] leading-[22px] mb-2">
                                            TYPICAL VALUES
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold  text-[22px] leading-[22px]">PER 100g</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-[22px] leading-[22px]">PER SACHET</p>
                                    </div>
                                </div>

                                {[
                                    { label: "Energy", per100g: "364kJ/86kcal", perSachet: "947kJ/224kcal" },
                                    { label: "Fat", per100g: "0.3g", perSachet: "0.8g" },
                                    { label: " Saturates", per100g: "0.1g", perSachet: "0.3g" },
                                    { label: "Carbohydrate", per100g: "17.6g", perSachet: "45.6g" },
                                    { label: " Sugars", per100g: "0.9g", perSachet: "2.4g" },
                                    { label: "Fibre", per100g: "1.3g", perSachet: "3.4g" },
                                    { label: "Protein", per100g: "2.6g", perSachet: "6.8g" },
                                    { label: "Salt", per100g: "0.93g", perSachet: "2.41g" },
                                ].map((row, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-4 sm:gap-1 lg:gap-1">
                                        <p className=" text-[18px] leading-[10px] lg:text-[22px]  font-gothic text-left lg:leading-[8px] ">{row.label}</p>
                                        <p className="text-[18px] leading-[10px] lg:text-[22px]  font-gothic text-left lg:leading-[8px]">{row.per100g}</p>
                                        <p className="text-[18px] leading-[10px] lg:text-[22px]  font-gothic text-left lg:leading-[8px]">{row.perSachet}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[16px] lg:text-[18px] leading-[20px] font-gothic pt-4">
                                *Reference Intake of an average adult (8400kJ / 2000kcal)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-[#416BA9] ">
                <img src="/product/ingridientbottom.svg" className="w-full h-full scale-[1.1]" />
                <img
                    src="/product/ready.svg"
                    alt="ready product"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] h-[150px] z-10"
                />
            </div>

            <div
                className="px-6 lg:px-12 place-self-center flex py-16 mx-auto w-full bg-[#416BA9] justify-center items-center"

            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 mt-16 max-w-7xl  transition-all duration-1000 "
                    ref={directionsRef}
                    style={{
                        opacity: directionsRevealed ? 1 : 0,
                        transform: directionsRevealed ? "translateY(0)" : "translateY(30px)",
                    }}>

                    <div className="flex flex-col items-center gap-4">
                        <div className="lg:w-48 lg:h-48 w-28 h-28  flex items-center justify-center">
                            <img src='/directions/empty.svg' />
                        </div>
                        <p className="text-base leading-6 font-gothic mt-4 max-w-[145px] font-bold text-white text-center">Empty sachet contents into your favourite mug.</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="lg:w-48 lg:h-48 w-28 h-28  flex items-center justify-center">
                            <img src='/directions/fill.svg' />

                        </div>
                        <p className="text-base leading-6 font-gothic mt-4 max-w-[145px] font-bold text-white text-center">
                            Fill your mug halfway with boiling water (approx. 180ml) and stir thoroughly.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="lg:w-48 lg:h-48 w-28 h-28  flex items-center justify-center">
                            <img src='/directions/stir.svg' />

                        </div>
                        <p className="text-base leading-6 font-gothic mt-4 max-w-[145px] font-bold text-white text-center">
                            Leave to stand for 5 mins with a stir halfway through. Top up if thinner sauce required.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="lg:w-48 lg:h-48 w-28 h-28  flex items-center justify-center">
                            <img src='/directions/enjoy.svg' />

                        </div>
                        <p className="text-base leading-6 font-gothic mt-4 max-w-[145px] font-bold text-white text-center">Take a moment. Ammnd Enjoy!</p>
                    </div>
                </div>
            </div>

            <div className="relative h-20 z-10 bg-[#C6211D]">
                <img src="/product/directionbottom.svg" className="w-full" />
            </div>
        </>
    );
}
