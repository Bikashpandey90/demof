"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import { useState } from "react"

interface User {
    name: string
    email: string
    registeredOn: string
    plan: string
    status: string
    image: string
}

export function LatestRegistered() {
    const [activeTab, setActiveTab] = useState<"registered" | "subscribed">("registered")

    const users: User[] = [
        {
            name: "Dianne Russell",
            email: "redaniel@gmail.com",
            registeredOn: "27 Mar 2024",
            plan: "Free",
            status: "Active",
            image: "/user-profile.jpg",
        },
        {
            name: "Wade Warren",
            email: "xterris@gmail.com",
            registeredOn: "27 Mar 2024",
            plan: "Basic",
            status: "Active",
            image: "/user-profile.jpg",
        },
        {
            name: "Albert Flores",
            email: "seannand@mail.ru",
            registeredOn: "27 Mar 2024",
            plan: "Standard",
            status: "Active",
            image: "/user-profile.jpg",
        },
        {
            name: "Bessie Cooper",
            email: "igerrin@gmail.com",
            registeredOn: "27 Mar 2024",
            plan: "Business",
            status: "Active",
            image: "/user-profile.jpg",
        },
        {
            name: "Arlene McCoy",
            email: "fellora@mail.ru",
            registeredOn: "27 Mar 2024",
            plan: "Enterprise",
            status: "Active",
            image: "/user-profile.jpg",
        },
    ]

    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full">
            <div className="p-6">
                <div className="flex flex-wrap items-center gap-1 justify-between mb-4">
                    <div className="flex gap-4 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab("registered")}
                            className={`flex items-center gap-2 pb-3 px-2 transition-colors ${activeTab === "registered"
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Latest Registered
                            <span className="text-xs font-semibold py-1 px-3 bg-gray-700 rounded-full text-white">35</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("subscribed")}
                            className={`flex items-center gap-2 pb-3 px-2 transition-colors ${activeTab === "subscribed"
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Latest Subscribe
                            <span className="text-xs font-semibold py-1 px-3 bg-gray-700 rounded-full text-white">35</span>
                        </button>
                    </div>
                    <Link href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        View All
                        <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold">Users</th>
                                <th className="text-left py-3 px-4 font-semibold">Registered On</th>
                                <th className="text-left py-3 px-4 font-semibold">Plan</th>
                                <th className="text-center py-3 px-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.image || "/placeholder.svg"}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full flex-shrink-0"
                                            />
                                            <div className="flex-grow">
                                                <h6 className="text-sm font-medium">{user.name}</h6>
                                                <span className="text-xs text-gray-600 font-medium">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{user.registeredOn}</td>
                                    <td className="py-3 px-4">{user.plan}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium text-xs">
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
