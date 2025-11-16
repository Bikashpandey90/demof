"use client"

import { Icon } from "@iconify/react/dist/iconify.js"

export function TotalSubscriber() {
    return (
        <div className="rounded-lg border border-gray-200 bg-white h-full">
            <div className="p-6">
                <h6 className="mb-4 font-semibold text-lg">Total Subscriber</h6>
                <div className="flex items-center gap-2 mb-5">
                    <h6 className="font-semibold">5,000</h6>
                    <p className="text-sm">
                        <span className="bg-red-100 border border-red-300 px-2 py-1 rounded-full font-semibold text-red-600 text-xs inline-flex items-center gap-1">
                            10%
                            <Icon icon="iconamoon:arrow-down-2-fill" className="w-3 h-3" />
                        </span>
                        - 20 Per Day
                    </p>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-400">
                    {/* Chart placeholder - integrate with recharts when needed */}
                    <span>Chart Component</span>
                </div>
            </div>
        </div>
    )
}
