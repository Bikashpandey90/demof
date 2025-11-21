"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import AddCategoryPhoto from "@/components/admin/add-category-photo"
import categorySvc from "@/services/category.service"
import * as Yup from "yup"
import CategoryPreview from "@/components/admin/categoryPreview"
import CategoryInformation from "@/components/admin/categoryInformation"
import { useNavigate } from "react-router-dom"

interface CategoryData {
    _id: string
    title: string
    image: string
    status: "active" | "inactive"
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    bowlImage?: string
    ingridientsImage?: string
}

export default function CategoryEditPage() {
    const { id } = useParams() ?? {}
    console.log(id)
    const navigate = useNavigate()
    const categoryId = id as string

    const mainPhotoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const bowlPhotoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const ingPhotoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)

    const [category, setCategory] = useState<CategoryData | null>(null)
    const [formData, setFormData] = useState({
        productName: "",
        status: "active",
        primaryColor: "#ff8000",
        secondaryColor: "#ff8000",
        backgroundColor: "#ff8000",
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setFetching(true)
                const response = await categorySvc.getCategoryByFilter(categoryId)
                setCategory(response.detail)
                setFormData({
                    productName: response.detail.title,
                    status: response.detail.status,
                    primaryColor: response.detail.primaryColor,
                    secondaryColor: response.detail.secondaryColor,
                    backgroundColor: response.detail.backgroundColor,

                })
            } catch (err: any) {
                console.error("Error fetching category:", err)
                setError("Failed to load category")
            } finally {
                setFetching(false)
            }
        }

        if (categoryId) {
            fetchCategory()
        }
    }, [categoryId])

    const CategoryDTO = Yup.object({
        productName: Yup.string().required("Category name is required!"),
    })

    const submitForm = async (data: typeof formData) => {
        try {
            setLoading(true)
            setError(null)

            const mainImage = mainPhotoRef.current?.getImages()[0]
            const bowlImage = bowlPhotoRef.current?.getImages()[0]
            const ingImage = ingPhotoRef.current?.getImages()[0]

            const formDataToSend = new FormData()
            formDataToSend.append("title", data.productName)
            formDataToSend.append("status", data.status)
            formDataToSend.append("primaryColor", data.primaryColor)
            formDataToSend.append("secondaryColor", data.secondaryColor)
            formDataToSend.append("backgroundColor", data.backgroundColor)

            if (mainImage?.file) {
                formDataToSend.append("image", mainImage.file)
            }
            if (bowlImage?.file) {
                formDataToSend.append("bowlImage", bowlImage.file)
            }
            if (ingImage?.file) {
                formDataToSend.append("ingridientsImage", ingImage.file)
            }

            console.log("Updating category:", formDataToSend)
            const response = await categorySvc.updateCategory(categoryId, formDataToSend as any)
            console.log("Category updated:", response.detail)

            setSuccess(true)

            setTimeout(() => {
                navigate("/admin/categories")
            }, 1500)
        } catch (exception: any) {
            console.error("Error updating category:", exception)
            setError(exception.error || "Failed to update category")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const isValid = await CategoryDTO.isValid(formData)
            if (!isValid) {
                const errors = await CategoryDTO.validate(formData).catch((err) => err)
                setError(errors.message)
                return
            }
            await submitForm(formData)
        } catch (err: any) {
            setError(err.message)
        }
    }

    if (fetching) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Loading category...</p>
                </div>
            </div>
        )
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Category not found</p>
                </div>
            </div>
        )
    }

    const previewProduct = {
        name: category.title,
        image: category.image,
        status: category.status,
        primaryColor: category.primaryColor,
        secondaryColor: category.secondaryColor
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
                    <p className="text-gray-600 mt-2">Update category information and images</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <CategoryPreview product={previewProduct} />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <AddCategoryPhoto defaultImage={category?.image} ref={mainPhotoRef} heading={"Update Category Photos"} />

                        <CategoryInformation formData={formData} setFormData={setFormData} />

                        <AddCategoryPhoto defaultImage={category?.bowlImage} ref={bowlPhotoRef} heading={"Update Bowl Image"} />
                        <AddCategoryPhoto defaultImage={category?.ingridientsImage} ref={ingPhotoRef} heading={"Update Ingredients Image"} />

                        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                Category updated successfully! Redirecting...
                            </div>
                        )}

                        <div className="mt-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || fetching}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-3 bg-[#487FFF] text-white font-semibold rounded-lg hover:bg-[#487ffa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Updating..." : "Update Category"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
