import FollowUs from "@/components/follow"
import Footer from "@/components/footer"
import GetInTouch from "@/components/get-in-touch"
import GiveItAShot from "@/components/give-it-a-shot"
import Header from "@/components/header"
import HotTastyConvenient from "@/components/hot-tasty"
import OurRange from "@/components/our-range"

const Home = () => {
    return (
        <>
            <main className="min-h-screen  w-full overflow-x-hidden">

                <Header />
                {/* <HeroSection /> */}
                <GiveItAShot />
                <HotTastyConvenient />
                <OurRange />
                <FollowUs />
                <GetInTouch />
                <Footer />
            </main>
        </>
    )
}
export default Home