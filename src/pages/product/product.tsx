import Footer from "@/components/footer"
import Header from "@/components/header"
import OurRange from "@/components/our-range"
import ProductHero from "@/components/producthero"

const ProductPage = () => {
    return (<>
        <main className="min-h-screen  w-full overflow-x-hidden">

            <Header />
            <ProductHero />
            <OurRange activeCategory={'SACHETS'} />
            <Footer />

        </main>

    </>)
}
export default ProductPage