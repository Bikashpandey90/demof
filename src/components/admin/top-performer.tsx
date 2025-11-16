"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

interface Performer {
    name: string
    agentId: string
    amount: string
    image: string
}

export function TopPerformer() {
    const performers: Performer[] = [
        { name: "Dianne Russell", agentId: "36254", amount: "$20", image: "/user-profile.jpg" },
        { name: "Wade Warren", agentId: "36254", amount: "$20", image: "/user-profile.jpg" },
        { name: "Albert Flores", agentId: "36254", amount: "$30", image: "/user-profile.jpg" },
        { name: "Bessie Cooper", agentId: "36254", amount: "$40", image: "/user-profile.jpg" },
        { name: "Arlene McCoy", agentId: "36254", amount: "$10", image: "/user-profile.jpg" },
        { name: "Arlene McCoy", agentId: "36254", amount: "$10", image: "/user-profile.jpg" },
    ]

    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full">
            <div className="p-6">
                <div className="flex items-center flex-wrap gap-2 justify-between mb-6">
                    <h6 className="text-lg font-bold">Top Performer</h6>
                    <Link href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        View All
                        <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                    </Link>
                </div>
                <div className="space-y-4">
                    {performers.map((performer, index) => (
                        <div key={index} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={performer.image || "/placeholder.svg"}
                                    alt={performer.name}
                                    className="w-10 h-10 rounded-full flex-shrink-0"
                                />
                                <div className="flex-grow">
                                    <h6 className="text-sm font-medium">{performer.name}</h6>
                                    <span className="text-xs text-gray-600 font-medium">Agent ID: {performer.agentId}</span>
                                </div>
                            </div>
                            <span className="text-blue-600 text-sm font-medium">{performer.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
