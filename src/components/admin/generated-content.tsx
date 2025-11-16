"use client"

import { useState } from "react"

export function GeneratedContent() {
    const [timeframe, setTimeframe] = useState("")

    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full">
            <div className="p-6">
                <div className="flex items-center flex-wrap gap-2 justify-between mb-4">
                    <h6 className="text-lg font-bold">Generated Content</h6>
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="py-2 px-3 text-sm border border-gray-300 rounded-md bg-white text-gray-600"
                    >
                        <option value="" disabled>
                            Select Timeframe
                        </option>
                        <option value="Today">Today</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <ul className="flex flex-wrap items-center mt-3 gap-3">
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-gray-600 text-sm font-semibold">
                            Word: <span className="text-gray-900 font-bold">500</span>
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-gray-600 text-sm font-semibold">
                            Image: <span className="text-gray-900 font-bold">300</span>
                        </span>
                    </li>
                </ul>
                <div className="mt-6">
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        {/* Bar chart placeholder */}
                        <span>Bar Chart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
