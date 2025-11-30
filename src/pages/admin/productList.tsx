'use client'

import { useEffect, useState } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import productSvc from '@/services/product.service'
import { useNavigate } from 'react-router-dom'

interface Product {
    _id: string
    name: string
    images: [{
        url: string
    }]
    category: {
        title: string
    },
    slug: string
    vegNonVeg: string
    tagline: string
    status: string
}



export default function ProductList() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [products, setProduct] = useState<Product[]>([])
    const navigate = useNavigate()


    const loadAllProducts = async () => {
        try {
            const response = await productSvc.getAllProducts()

            console.log("API response: ", response)
            setProduct(response.data.detail)

        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }
    useEffect(() => {
        loadAllProducts()
    }, [])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(new Set(products.map(p => p._id)))
        } else {
            setSelectedIds(new Set())
        }
    }

    const handleSelectProduct = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedIds)
        if (checked) {
            newSelected.add(id)
        } else {
            newSelected.delete(id)
        }
        setSelectedIds(newSelected)
    }


    const deleteProduct = async (id: string) => {
        try {
            await productSvc.deleteProduct(id)

        } catch (exception) {
            console.log(exception)
        }
    }
    const truncateWords = (text?: string, limit = 3) => {
        if (!text) return ''
        const words = text.trim().split(/\s+/)
        return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...'
    }


    return (
        <div className="min-h-screen bg-transparent p-0 md:p-0">
            <div className="mx-auto max-w-7xl p-4">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">All Product List</h1>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2 font-medium"
                            onClick={() => {
                                navigate('/admin/product')
                            }}>
                            Add Product
                        </Button>
                        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 text-sm font-medium ">
                            <option>This Month</option>
                            <option>This Week</option>
                            <option>Today</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-2xl bg-white shadow">
                    <table className="w-full">



                        <thead className="border-b border-gray-200 bg-white">
                            <tr>
                                <th className="w-12 px-4 py-4 md:px-6">
                                    <Checkbox
                                        checked={selectedIds.size === products.length && products.length > 0}
                                        onCheckedChange={handleSelectAll}
                                        className="rounded border-gray-300"
                                    />
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 md:px-6">
                                    Product Name & Size
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 md:px-6">
                                    Status
                                </th>
                                <th className="hidden px-4 py-4 text-left text-sm font-semibold text-gray-600 md:table-cell md:px-6">
                                    Tagline
                                </th>
                                <th className="hidden px-4 py-4 text-left text-sm font-semibold text-gray-600 lg:table-cell lg:px-6">
                                    Category
                                </th>
                                <th className="hidden px-4 py-4 text-left text-sm font-semibold text-gray-600 lg:table-cell lg:px-6">
                                    VegNonVeg
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 md:px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    <td className="w-12 px-4 py-4 md:px-6">
                                        <Checkbox
                                            checked={selectedIds.has(product._id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectProduct(product._id, checked as boolean)
                                            }
                                            className="rounded border-gray-300"
                                        />
                                    </td>

                                    <td className="px-4 py-4 md:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl ">

                                                <img
                                                    src={product?.images[0]?.url || ''}
                                                    className='h-10 w-10 object-contain overflow'
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{product.name}</p>
                                                {/* <p className="text-xs text-gray-500">: {product.}</p> Extra info */}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 font-semibold text-gray-600 md:px-6">
                                        {product.status.toUpperCase()}
                                    </td>

                                    <td className="hidden px-4 py-4 md:table-cell md:px-6">
                                        <div className="text-sm">
                                            <p className="text-gray-700">{truncateWords(product.tagline)}</p>
                                        </div>
                                    </td>

                                    <td className="hidden px-4 py-4 text-gray-700 lg:table-cell lg:px-6">
                                        <span className="text-sm">{product?.category?.title ?? ""}</span>
                                    </td>

                                    <td className="hidden px-4 py-4 lg:table-cell lg:px-6">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="font-semibold text-gray-800">{product.vegNonVeg}</span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 md:px-6">
                                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                                            <button
                                                className="rounded p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                                title="View"
                                                onClick={() => {
                                                    navigate('/products/' + product.slug)
                                                }}
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="rounded p-2 text-orange-400 hover:bg-orange-50 transition-colors"
                                                title="Edit"
                                                onClick={() => {
                                                    navigate(product.slug)
                                                }}
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="rounded p-2 text-red-400 hover:bg-red-50 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
