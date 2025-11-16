"use client"

import { useState } from "react"

export function UsersOverview() {
    const [timeframe, setTimeframe] = useState("Today")

    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full overflow-hidden">
            <div className="p-6">
                <div className="flex items-center flex-wrap gap-2 justify-between mb-4">
                    <h6 className="text-lg font-bold">Users Overview</h6>
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
                <div className="h-64 flex items-center justify-center text-gray-400">
                    {/* Donut chart placeholder */}
                    <span>Donut Chart</span>
                </div>
                <ul className="flex flex-wrap items-center justify-between mt-4 gap-3">
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-blue-600" />
                        <span className="text-gray-600 text-sm font-normal">
                            New: <span className="text-gray-900 font-semibold">500</span>
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-yellow-500" />
                        <span className="text-gray-600 text-sm font-normal">
                            Subscribed: <span className="text-gray-900 font-semibold">300</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
