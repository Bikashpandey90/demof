interface ProductPreviewProps {
    product: {
        name: string
        image: string
        status: string
        category?: string
    }
}

export default function ProductPreview({ product }: ProductPreviewProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Product Preview</h3>

            <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div>
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    {/* <p className="text-sm text-gray-600 mt-1">{product.category}</p> */}
                </div>



                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        </div>
    )
}
