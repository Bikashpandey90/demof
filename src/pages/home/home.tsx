import BlogPostCarousel from "@/components/blogs"
import FollowUs from "@/components/follow"
import GetInTouch from "@/components/get-in-touch"
import GiveItAShot from "@/components/give-it-a-shot"
import HotTastyConvenient from "@/components/hot-tasty"
import Liscense from "@/components/liscence"
// import AnimatedMenu from "@/components/AnimatedMenu/AnimatedMenu"
import OurRange from "@/components/our-range"
import RecipesSection from "@/components/receipes"
import { useRef, useState } from "react"

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | 'MOMO'>('MOMO')
    const ourRangeRef = useRef<HTMLDivElement>(null)

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)

        if (ourRangeRef.current) {
            ourRangeRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }
    return (

        <>

            <main className="min-h-screen  w-full overflow-x-hidden">


                <GiveItAShot onCategoryClick={handleCategoryClick} />
                <HotTastyConvenient />
                <div ref={ourRangeRef}>
                    <OurRange activeCategory={selectedCategory} />
                </div>

                <FollowUs />
                <Liscense />

                <BlogPostCarousel />
                <GetInTouch />
                <RecipesSection />
            </main>
        </>
    )
}
export default Home