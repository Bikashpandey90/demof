"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

export function SalesStatistic() {
    const [timeframe, setTimeframe] = useState("Yearly")

    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full">
            <div className="p-6">
                <div className="flex flex-wrap items-center justify-between mb-4">
                    <h6 className="text-lg font-medium">Sales Statistic</h6>
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="py-2 px-3 text-sm border border-gray-300 rounded-md bg-white"
                    >
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Today">Today</option>
                    </select>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 mb-4">
                    <h6 className="text-2xl font-bold">$27,200</h6>
                    <span className="text-xs font-semibold rounded-full bg-green-100 text-green-600 border border-green-200 px-3 py-1 inline-flex items-center gap-1">
                        10% <Icon icon="bxs:up-arrow" className="text-xs" />
                    </span>
                    <span className="text-xs font-medium">+ $1500 Per Day</span>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-400">
                    {/* Area chart placeholder */}
                    <span>Area Chart</span>
                </div>
            </div>
        </div>
    )
}
