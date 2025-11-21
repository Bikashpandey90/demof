import Footer from "@/components/footer"
import Header from "@/components/header"
import { ScrollToTop } from "@/components/scrollToTop"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (<>
        <Header />
        <ScrollToTop />
        <Outlet />
        <Footer />
    </>)
}
export default HomeLayout