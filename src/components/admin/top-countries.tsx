"use client"

import { useState } from "react"

interface CountryData {
    name: string
    users: number
    percentage: number
    image: string
    barColor: string
}

export function TopCountries() {
    const [timeframe, setTimeframe] = useState("Today")

    const countries: CountryData[] = [
        { name: "USA", users: 1240, percentage: 80, image: "/generic-flag.png", barColor: "bg-blue-600" },
        { name: "Japan", users: 1240, percentage: 60, image: "/generic-flag.png", barColor: "bg-orange-500" },
        { name: "France", users: 1240, percentage: 49, image: "/generic-flag.png", barColor: "bg-yellow-500" },
        { name: "Germany", users: 1240, percentage: 100, image: "/generic-flag.png", barColor: "bg-green-600" },
        { name: "South Korea", users: 1240, percentage: 30, image: "/generic-flag.png", barColor: "bg-blue-500" },
        { name: "USA", users: 1240, percentage: 80, image: "/generic-flag.png", barColor: "bg-blue-600" },
    ]

    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full">
            <div className="p-6">
                <div className="flex items-center flex-wrap gap-2 justify-between mb-5">
                    <h6 className="text-lg font-bold">Top Countries</h6>
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="py-2 px-3 text-sm border border-gray-300 rounded-md bg-white text-gray-600"
                    >
                        <option value="Today">Today</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg h-full min-h-64 flex items-center justify-center text-gray-400">
                        {/* Map placeholder */}
                        <span>World Map</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="max-h-80 overflow-y-auto space-y-3">
                            {countries.map((country, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={country.image || "/placeholder.svg"}
                                            alt={country.name}
                                            className="w-10 h-10 rounded-full flex-shrink-0"
                                        />
                                        <div className="flex-grow">
                                            <h6 className="text-sm font-medium">{country.name}</h6>
                                            <span className="text-xs text-gray-600 font-medium">{country.users.toLocaleString()} Users</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24">
                                            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${country.barColor} rounded-full`}
                                                    style={{ width: `${country.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-gray-600 font-xs font-semibold w-10 text-right">{country.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
