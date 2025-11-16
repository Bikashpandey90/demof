"use client"

import { Plus, Minus } from 'lucide-react'

interface PricingDetailsProps {
    formData: any
    setFormData: (data: any) => void
}

export default function NutritionalInfo({ formData, setFormData }: PricingDetailsProps) {

    const { header, rows, footer } = formData.nutritionalInfo

    const update = (updateObj: any) => {
        setFormData((prev: any) => ({
            ...prev,
            nutritionalInfo: {
                ...prev.nutritionalInfo,
                ...updateObj
            }
        }))
    }


    const handleRowChange = (index: number, field: string, value: string) => {
        const updatedRows = rows.map((row: any, i: number) =>
            i === index ? { ...row, [field]: value } : row
        )

        update({ rows: updatedRows })
    }


    const addRow = (index: number) => {
        const updatedRows = [
            ...rows.slice(0, index + 1),
            { values: "", perValue: "", perPacket: "" },
            ...rows.slice(index + 1),
        ]

        update({ rows: updatedRows })
    }
    const removeRow = (index: number) => {
        if (rows.length === 1) return

        update({ rows: rows.filter((_: any, i: number) => i !== index) })
    }



    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
                Nutritional Information
            </h3>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nutritional Header</label>
                <textarea
                    placeholder="Nutritional Header"
                    rows={1}
                    value={header}
                    onChange={(e) => update({ header: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {rows.map((row: any, idx: number) => (
                <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 mb-4 items-center"
                >
                    <div className="col-span-4">
                        {idx === 0 && (
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Values
                            </label>
                        )}
                        <input
                            type="text"
                            placeholder="Energy"
                            value={row.values}
                            onChange={(e) => handleRowChange(idx, "values", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="col-span-4">
                        {idx === 0 && (
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Per 100g
                            </label>
                        )}
                        <input
                            type="text"
                            placeholder="0.3g"
                            value={row.perValue}
                            onChange={(e) => handleRowChange(idx, "perValue", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="col-span-3">
                        {idx === 0 && (
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Per Sachet
                            </label>
                        )}
                        <input
                            type="text"
                            placeholder="10g"
                            value={row.perPacket}
                            onChange={(e) => handleRowChange(idx, "perPacket", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="col-span-1 flex justify-center place-self-end self-end justify-self-end mb-1">
                        <button
                            onClick={() =>
                                idx === rows.length - 1 ? addRow(idx) : removeRow(idx)
                            }
                            className={`p-2 rounded-full transition  
                                ${idx === rows.length - 1
                                    ? "bg-green-100 hover:bg-green-200 text-green-700"
                                    : "bg-red-100 hover:bg-red-200 text-red-700"
                                }
                                `}
                        >
                            {idx === rows.length - 1 ? <Plus size={18} /> : <Minus size={18} />}
                        </button>
                    </div>
                </div>
            ))}

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nutritional Footer</label>
                <textarea
                    placeholder="Nutritional Footer"
                    rows={1}
                    value={footer}
                    onChange={(e) => update({ footer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
        </div>
    )
}
