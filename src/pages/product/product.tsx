
import OurRange from "@/components/our-range"
import ProductHero from "@/components/producthero"

const ProductPage = () => {
    return (<>
        <main className="min-h-screen  w-full overflow-x-hidden">

            <ProductHero />
            <OurRange activeCategory={'MOMO'} />

        </main>

    </>)
}
export default ProductPage