import FollowUs from "@/components/follow"
import Footer from "@/components/footer"
import GetInTouch from "@/components/get-in-touch"
import GiveItAShot from "@/components/give-it-a-shot"
import Header from "@/components/header"
import HotTastyConvenient from "@/components/hot-tasty"
import OurRange from "@/components/our-range"
import { useRef, useState } from "react"

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | 'SACHETS'>('SACHETS')
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

                <Header />
                <GiveItAShot onCategoryClick={handleCategoryClick} />
                <HotTastyConvenient />
                <div ref={ourRangeRef}>
                    <OurRange activeCategory={selectedCategory} />
                </div>
                <FollowUs />
                <GetInTouch />
                <Footer />
            </main>
        </>
    )
}
export default Home