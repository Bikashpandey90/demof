'use client'

import { useEffect, useState } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import categorySvc from '@/services/category.service'
import { useNavigate } from 'react-router-dom'

interface Category {
    _id: string
    title: string
    image: string
    slug: string
    status: string
}



export default function CategoryList() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [categorys, setCategory] = useState<Category[]>([])
    const navigate = useNavigate()


    const loadAllCategorys = async () => {
        try {
            const response = await categorySvc.getAllCategory()

            console.log("API response: ", response)
            setCategory(response.detail)

        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }
    useEffect(() => {
        loadAllCategorys()
    }, [])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(new Set(categorys.map(p => p._id)))
        } else {
            setSelectedIds(new Set())
        }
    }

    const handleSelectCategory = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedIds)
        if (checked) {
            newSelected.add(id)
        } else {
            newSelected.delete(id)
        }
        setSelectedIds(newSelected)
    }


    const deleteCategory = async (id: string) => {
        try {
            await categorySvc.deleteCategory(id)

        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div className="min-h-screen bg-transparent p-0 md:p-0">
            <div className="mx-auto max-w-7xl p-4">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">All Category List</h1>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2 font-medium"
                            onClick={() => {
                                navigate('/admin/category')
                            }}>
                            Add Category
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
                                        checked={selectedIds.size === categorys.length && categorys.length > 0}
                                        onCheckedChange={handleSelectAll}
                                        className="rounded border-gray-300"
                                    />
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 md:px-6">
                                    Category Name
                                </th>
                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 md:px-6">
                                    Status
                                </th>


                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600 md:px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categorys.map((category, index) => (
                                <tr
                                    key={category._id}
                                    className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    <td className="w-12 px-4 py-4 md:px-6">
                                        <Checkbox
                                            checked={selectedIds.has(category._id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectCategory(category._id, checked as boolean)
                                            }
                                            className="rounded border-gray-300"
                                        />
                                    </td>

                                    <td className="px-4 py-4 md:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl ">

                                                <img
                                                    src={category?.image}
                                                    className='h-10 w-10 object-contain overflow'
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{category.title}</p>
                                                {/* <p className="text-xs text-gray-500">Size: {category.sizes}</p> */}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 font-semibold text-gray-500 md:px-6">
                                        {category.status.toUpperCase()}
                                    </td>





                                    {/* Actions */}
                                    <td className="px-4 py-4 md:px-6">
                                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                                            <button
                                                className="rounded p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                                title="View"
                                                onClick={() => {
                                                    navigate('/category/' + category.slug)
                                                }}
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="rounded p-2 text-orange-400 hover:bg-orange-50 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(category._id)}
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
