import { GeneratedContent } from "@/components/admin/generated-content"
// import { LatestRegistered } from "@/components/admin/latest-registered"
import { SalesStatistic } from "@/components/admin/sales"
import { TopCountries } from "@/components/admin/top-countries"
// import { TopPerformer } from "@/components/admin/top-performer"
import { TotalSubscriber } from "@/components/admin/top-subscriber"
import { UnitCount } from "@/components/admin/unit-count"
import { UsersOverview } from "@/components/admin/user-overview"

const Dashboard = () => {
    return (
        <>
            <UnitCount />

            <section className='flex flex-wrap gap-y-6 mt-1'>
                <SalesStatistic />

                <TotalSubscriber />

                <UsersOverview />

                {/* <LatestRegistered /> */}

                {/* <TopPerformer /> */}

                <TopCountries />

                <GeneratedContent />
            </section>
        </>
    )
}
export default Dashboard