import Directionsw from "@/components/directions"
import Footer from "@/components/footer"
import Header from "@/components/header"
import IngredientsPage from "@/components/ingridients"
import OurRange from "@/components/our-range"
import ProductHero from "@/components/producthero"

const ProductPage = () => {
    return (<>
        <main className="min-h-screen  w-full overflow-x-hidden">

            <Header />
            <ProductHero />
            <IngredientsPage />
            <Directionsw />
            <OurRange activeCategory={'SACHETS'} />
            <Footer />

        </main>

    </>)
}
export default ProductPage