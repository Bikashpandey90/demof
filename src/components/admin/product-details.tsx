"use client"

import { useState } from "react"

interface ProductDetailsProps {
    product: any
    setProduct: (product: any) => void
}

export default function ProductDetails(_props: ProductDetailsProps) {
    const [formData, setFormData] = useState({
        productName: "Men Black Slim Fit T-shirt",
        category: "Fashion",
        brand: "",
        weight: "",
        gender: "Select Gender",
        description: "",
        tagNumber: "",
        stock: "",
        tags: ["Fashion"],
        sizes: [],
        colors: [],
        price: 80,
        discount: 20,
        tax: 0,
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleRemoveTag = (tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t: string) => t !== tag),
        }))
    }

    return (
        <div className="flex-1 overflow-y-auto bg-white">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
                <h1 className="text-xl font-semibold text-gray-900">CREATE PRODUCT</h1>
            </div>

            {/* Form Content */}
            <div className="px-8 py-6 max-w-4xl">
                {/* Add Product Photo Section */}
                <div className="mb-8">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Add Product Photo</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                        <svg
                            className="w-12 h-12 text-orange-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="text-gray-700">
                            Drop your images here, or{" "}
                            <span className="text-orange-500 font-semibold cursor-pointer">click to browse</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
                        </p>
                    </div>
                </div>

                {/* Product Information */}
                <div className="mb-8">
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
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option>Choose a categories</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <input
                                type="text"
                                placeholder="Brand Name"
                                value={formData.brand}
                                onChange={(e) => handleInputChange("brand", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                            <input
                                type="text"
                                placeholder="In gm & kg"
                                value={formData.weight}
                                onChange={(e) => handleInputChange("weight", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option>Select Gender</option>
                            </select>
                        </div>
                    </div>

                    {/* Sizes and Colors */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Size :</label>
                        <div className="flex gap-2">
                            {["XS", "S", "M", "XL", "XXL", "3XL"].map((size) => (
                                <button
                                    key={size}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
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
                </div>

                {/* Description */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        placeholder="Short description about the product"
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Tag, Stock, Tag Section */}
                <div className="mb-8 grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tag Number</label>
                        <input
                            type="text"
                            placeholder="#......"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                        <input
                            type="text"
                            placeholder="Quantity"
                            value={formData.stock}
                            onChange={(e) => handleInputChange("stock", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                        <div className="flex gap-2">
                            {formData.tags.map((tag) => (
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
                    </div>
                </div>

                {/* Pricing Details */}
                <div className="mb-8">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Pricing Details</h3>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
                                <input
                                    type="text"
                                    placeholder="000"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">%</span>
                                <input
                                    type="text"
                                    placeholder="000"
                                    value={formData.discount}
                                    onChange={(e) => handleInputChange("discount", e.target.value)}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tax</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">৳</span>
                                <input
                                    type="text"
                                    placeholder="000"
                                    value={formData.tax}
                                    onChange={(e) => handleInputChange("tax", e.target.value)}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-4 pb-8">
                    <button className="flex-1 px-6 py-2 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                        Create Product
                    </button>
                    <button className="flex-1 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                        Cancel
                    </button>
                </div>

                {/* Footer Credit */}
                <div className="text-center text-sm text-gray-600 pb-8">
                    2025 © Larkon. Crafted by ❤️ <span className="text-orange-500 font-semibold">Techzaa</span>
                </div>
            </div>
        </div>
    )
}
