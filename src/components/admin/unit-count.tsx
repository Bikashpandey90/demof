"use client"

import { Icon } from "@iconify/react"

interface StatCard {
    title: string
    value: string
    icon: string
    bgColor: string
    iconColor: string
    trend: string
    trendLabel: string
    isTrendUp: boolean
}

export function UnitCount() {
    const stats: StatCard[] = [
        {
            title: "Total Users",
            value: "20,000",
            icon: "gridicons:multiple-users",
            bgColor: "bg-cyan-500",
            iconColor: "text-white",
            trend: "+5000",
            trendLabel: "Last 30 days users",
            isTrendUp: true,
        },
        {
            title: "Total Subscription",
            value: "15,000",
            icon: "fa-solid:award",
            bgColor: "bg-purple-500",
            iconColor: "text-white",
            trend: "-800",
            trendLabel: "Last 30 days",
            isTrendUp: false,
        },
        {
            title: "Total Free Users",
            value: "5,000",
            icon: "fluent:people-20-filled",
            bgColor: "bg-blue-500",
            iconColor: "text-white",
            trend: "+200",
            trendLabel: "Last 30 days",
            isTrendUp: true,
        },
        {
            title: "Total Income",
            value: "$42,000",
            icon: "solar:wallet-bold",
            bgColor: "bg-green-500",
            iconColor: "text-white",
            trend: "+$20,000",
            trendLabel: "Last 30 days",
            isTrendUp: true,
        },
        {
            title: "Total Expense",
            value: "$30,000",
            icon: "fa6-solid:file-invoice-dollar",
            bgColor: "bg-red-500",
            iconColor: "text-white",
            trend: "+$5,000",
            trendLabel: "Last 30 days",
            isTrendUp: true,
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white overflow-hidden h-full">
                    <div className="p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div>
                                <p className="font-medium text-blue-600 text-sm mb-1">{stat.title}</p>
                                <h6 className="text-lg font-semibold">{stat.value}</h6>
                            </div>
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                                <Icon icon={stat.icon} className={`${stat.iconColor} text-2xl`} />
                            </div>
                        </div>
                        <p className="font-medium text-sm text-gray-600 mt-3 flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 ${stat.isTrendUp ? "text-green-600" : "text-red-600"}`}>
                                <Icon icon={stat.isTrendUp ? "bxs:up-arrow" : "bxs:down-arrow"} className="text-xs" />
                                {stat.trend}
                            </span>
                            {stat.trendLabel}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
