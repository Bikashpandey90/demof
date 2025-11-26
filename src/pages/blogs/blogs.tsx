import OurRange from "@/components/our-range";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const BlogsPage = () => {
    const [contentRevealed, setContentRevealed] = useState(false);
    const [headingRevealed, setHeadingRevealed] = useState(false);

    const lastScrollY = useRef(0)
    const [isScrollingDown, setIsScrollingDown] = useState(true)

    const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.3 })
    const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.3 })
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
        if (contentInView && isScrollingDown) setContentRevealed(true)
    }, [contentInView, isScrollingDown])

    useEffect(() => {
        if (headingInView && isScrollingDown) setHeadingRevealed(true)
    }, [headingInView, isScrollingDown])



    return (<>


        <div className="relative z-10 lg:h-[100vh]  overflow  h-[50vh] bg-cover    bg-center bg-no-repeat  bg-[#C41541] flex items-center justify-center px-6"
            style={{
                backgroundImage: 'url(/blogs/highimage.jpg)'
            }}>
            <div className=" bg-black items-end z-10 place-self-end self-end justify-self-end"

            >
                {/* <img
                    src="/swoosh-3.svg"
                    className="absolute hidden sm:block lg:hidden xl:block md:hidden justify-end top-0  left-1/2 -translate-x-1/2 w-[60%] p-24 md:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] object-cover object-top"
                    alt="Background design"
                    style={{ transform: 'translateX(-50%)', zIndex: 0 }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-brando font-bold text-white text-center leading-tight tracking-wider">
                        BLOGS
                    </h1>
                </div>

            </div>

            {/* <div className="absolute hidden sm:hidden md:hidden lg:block -bottom-32 left-0 w-24 h-24  md:w-32 md:h-32  lg:w-80 lg:h-[400px] ">
                <img src="/blogs/blogs-left.png" alt="Decorative chili peppers" className="w-full h-full object-cover" />
            </div>

            <div className="absolute hidden sm:hidden md:hidden lg:block -bottom-32 right-0 w-28 h-28  md:w-40 md:h-40 lg:w-96 lg:h-[500px] ">
                <img src="/blogs/blogs-right.png" alt="Decorative noodle bowl" className="w-full h-full object-cover" />
            </div> */}
            <img
                src="/blogs/blogs-top.svg"
                className="bg-none absolute  bottom-0 w-full z-30 pointer-events-none"
                style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}
            />

        </div>


        <section className="relative w-full bg-[#F9971F] py-16 md:py-24 overflow-hidden">

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center ">
                <h1 className="text-4xl md:text-4xl leading-9 font-bold text-white font-brando mb-8 transition-all duration-1000"
                    ref={headingRef}
                    style={{
                        opacity: headingRevealed ? 1 : 0,
                        transform: headingRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "50ms",
                    }}
                >
                    THE TASTIEST SNACK YOU CAN ENJOY IN A MUG.
                </h1>

                <div
                    ref={contentRef}
                    className="space-y-6 text-white font-gothic font-thin  text-lg md:text-xl leading-7 transition-all duration-1000"
                    style={{
                        opacity: contentRevealed ? 1 : 0,
                        transform: contentRevealed ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: "100ms",
                    }}
                >
                    <p>
                        Slow down for a few delicious minutes with Mug Shot. The Warm comforting flavour packed snack that good to
                        go in five minutes. Use your favourite Mug for the perfect pick me up.
                    </p>

                    <p>Mug Shot is a range of TASTY pasta & noodle snacks in a convenient sachet format.</p>

                    <p>
                        Mug Shot always delivers with classic flavours, temptingly stirred up, hot and delicious in your trusty mug.
                        Simply boil the kettle, reach for your favourite mug and you can enjoy a tasty Mug Shot in just 5 minutes.
                    </p>

                    <p>
                        Whether you're after a quick tasty lunch or a snack to tide you over until your next meal, we've got a
                        delicious product for you. Every recipe is packed full of tasty ingredients, with all natural flavours, low
                        calories, less than 2% fat and contains no MSG.
                    </p>
                </div>
            </div>


        </section>

        <img
            src="/blogs/blogs-bottom.svg"
            alt="Bottom irregular edge"
            className=" bg-[#c6211D] w-full h-auto block -mb-[1px] z-30 pointer-events-none"
            style={{ display: "block", margin: 0, padding: 0, lineHeight: 0 }}

        />


        <OurRange activeCategory={'MOMO'} />

    </>)
}

export default BlogsPage;