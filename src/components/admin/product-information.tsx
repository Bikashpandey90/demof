"use client"

import categorySvc from "@/services/category.service"
import { useEffect, useState } from "react"

interface ProductInformationProps {
    formData: any
    setFormData: (data: any) => void
}
interface Category {
    _id: string,
    title: string
}

export default function ProductInformation({ formData, setFormData }: ProductInformationProps) {
    const [categories, setCategories] = useState<Category[]>([])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleRemoveTag = (tag: string) => {
        setFormData((prev: any) => ({
            ...prev,
            tags: prev.tags.filter((t: string) => t !== tag),
        }))
    }

    const handleAddTag = (tag: string) => {
        if (tag && !formData.tags.includes(tag)) {
            setFormData((prev: any) => ({
                ...prev,
                tags: [...prev.tags, tag],
            }))
        }
    }
    const getCategories = async () => {
        try {
            const response = await categorySvc.getAllCategory()
            console.log(response.detail)
            setCategories(response.detail)
        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Product Information</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        placeholder="Items Name"
                        value={formData.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
                    <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option>Choose a categories</option>
                        {
                            categories.map((category) => (
                                <option key={category?._id} value={category._id}>{category.title}</option>
                            ))
                        }
                        {/* <option>SACHETS</option>
                        <option>POTS</option>
                        <option>MIGHTY POTS</option> */}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergy Advice</label>
                    <input
                        type="text"
                        placeholder="Allergy Advice"
                        value={formData.allergyAdvice}
                        onChange={(e) => handleInputChange("allergyAdvice", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Veg / Non-veg</label>
                    <select
                        value={formData.vegStatus}
                        onChange={(e) => handleInputChange("vegStatus", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option>Vegetarian</option>
                        <option>Non-Vegetarian</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Tagline</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="The best momos in the town !"
                        value={formData.tagline}
                        onChange={(e) => handleInputChange("tagline", e.target.value.slice(0, 100))}
                        maxLength={100}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-xs text-gray-500 absolute right-2 top-3">
                        {formData.tagline.length}/100
                    </span>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Colors :</label>
                <div className="flex gap-3">
                    {[
                        { name: "Navy", color: "#1e3a8a" },
                        { name: "Gold", color: "#fbbf24" },
                        { name: "Light", color: "#f3f4f6" },
                        { name: "Orange", color: "#f97316" },
                        { name: "Green", color: "#10b981" },
                        { name: "Teal", color: "#14b8a6" },
                        { name: "Blue", color: "#3b82f6" },
                    ].map((color) => (
                        <button
                            key={color.name}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                            style={{ backgroundColor: color.color }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                <textarea
                    placeholder="Ingredients of the product"
                    rows={4}
                    value={formData.ingridients}
                    onChange={(e) => handleInputChange("ingridients", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex gap-2 flex-wrap mb-2">
                        {formData.tags.map((tag: string) => (
                            <div
                                key={tag}
                                className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)} className="hover:opacity-70">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter tag and press Enter"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddTag((e.target as HTMLInputElement).value)
                                    ; (e.target as HTMLInputElement).value = ''
                            }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Links</label>
                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={formData.links}
                        onChange={(e) => handleInputChange("links", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>
        </div>
    )
}
