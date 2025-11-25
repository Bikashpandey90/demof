import Header from "@/components/header"
import NewFooter from "@/components/newfooter"
import { ScrollToTop } from "@/components/scrollToTop"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (<>
        <Header />
        <ScrollToTop />
        <Outlet />
        <NewFooter />
    </>)
}
export default HomeLayout