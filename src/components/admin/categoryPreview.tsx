"use client"

interface ProductPreviewProps {
    product: {
        name: string
        category: string
        price: number
        discountedPrice: number
        image: string
    }
}

export default function CategoryPreview({ product }: ProductPreviewProps) {

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="mb-6 bg-[#EEF2F7] rounded-xl p-2 flex items-center justify-center h-72">
                <img
                    src={product.image || "/shirt.png"}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-4">({product.category})</p>




            <div className="mb-8">
                <p className="text-sm text-gray-700 font-medium mb-3">Primary & Secondary Colors </p>
                <div className="flex gap-3">
                    {[
                        { name: "Blue", color: "blue" },
                        { name: "Navy", color: "#1e3a8a" },


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
    )
}
