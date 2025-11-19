"use client"

import { ColorPicker } from "../colorpicker/ColorPicker"

interface ProductInformationProps {
    formData: any
    setFormData: (data: any) => void
}

export default function CategoryInformation({ formData, setFormData }: ProductInformationProps) {
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Category Information</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <input
                        type="text"
                        placeholder="Items Name"
                        value={formData.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>Inactive</option>
                        <option>Active</option>
                    </select>
                </div>

            </div>

            <div className="mb-6 grid lg:flex mt-4 gap- lg:justify-between">
                <label className="block text-sm font-medium text-gray-700 mb">Primary Color</label>
                <div className="flex gap-1">
                    {[
                        { name: "Orange", color: "#f97316" },
                        { name: "Teal", color: "#14b8a6" },
                    ].map((color) => (
                        <button
                            key={color.name}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                            style={{ backgroundColor: color.color }}
                            title={color.name}
                        />
                    ))}
                    <ColorPicker defaultValue={'#ff8000'} />

                </div>
                <label className="block text-sm font-medium text-gray-700 mb">Secondary Color</label>
                <div className="flex gap-1">
                    {[

                        { name: "Orange", color: "#f97316" },
                        { name: "Teal", color: "#14b8a6" },
                    ].map((color) => (
                        <button
                            key={color.name}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                            style={{ backgroundColor: color.color }}
                            title={color.name}
                        />

                    ))}
                    <ColorPicker defaultValue={'#ff8000'} />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb">Secondary Color</label>
                <div className="flex gap-1">
                    {[

                        { name: "Orange", color: "#f97316" },
                        { name: "Teal", color: "#14b8a6" },
                    ].map((color) => (
                        <button
                            key={color.name}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                            style={{ backgroundColor: color.color }}
                            title={color.name}
                        />

                    ))}
                    <ColorPicker defaultValue={'#ff8000'} />
                </div>

            </div>



        </div>
    )
}
