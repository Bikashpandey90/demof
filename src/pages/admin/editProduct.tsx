"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AddProductPhoto from "@/components/admin/add-product-photo"
import ProductInformation from "@/components/admin/product-information"
import ProductPreview from "@/components/admin/product-preview"
import NutritionalInfo from "@/components/admin/nutritional-information"
import productSvc from "@/services/product.service"
import * as Yup from "yup"

interface ProductData {
    _id: string
    name: string
    category: {
        _id: string
        title: string

    }
    images: [{
        url: string,
        position?: number
    }]
    status: "active" | "inactive"
    tagline: string
    ingridients: string
    allergyAdvice: string
    vegNonVeg: string
    primaryColor: string
    secondaryColor: string
    links: string
    tags: string[]
    nutritionalInfo: {
        header: string
        rows: Array<{ values: string; perValue: string; perPacket: string }>
        footer: string
    },
    directionImages: [
        {
            url: string
        }
    ]
}

export default function ProductEditPage() {
    const { slug } = useParams() || {}
    const navigate = useNavigate()

    const productImagesRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const directionImagesRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)

    const [product, setProduct] = useState<ProductData | null>(null)
    const [formData, setFormData] = useState({
        productName: "",
        category: "SACHETS",
        allergyAdvice: "",
        vegNonVeg: "veg",
        status: "active" as const,
        tagline: "",
        ingridients: "",
        tags: [],
        links: "",
        nutritionalInfo: {
            header: "",
            rows: [{ values: "", perValue: "", perPacket: "" }],
            footer: "",
        },
        primaryColor: "#ff8000",
        secondaryColor: "#ff8000",
    })

    console.log(product?.directionImages)

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setFetching(true)
                const response = await productSvc.fetchProductBySlug(slug as string)
                setProduct(response.detail)
                setFormData({
                    productName: response.detail.name || '',
                    category: response.detail.category?._id || '',
                    allergyAdvice: response.detail.allergyAdvice || '',
                    vegNonVeg: response.detail.vegNonVeg || 'veg',
                    status: response.detail.status || 'active',
                    tagline: response.detail.tagline || '',
                    ingridients: response.detail.ingridients || '',
                    tags: response.detail.tags || [],
                    links: response.detail.links || '',
                    nutritionalInfo: response.detail.nutritionalInfo || { header: "", rows: [], footer: "" },
                    primaryColor: response.detail.primaryColor || '#ff8000',
                    secondaryColor: response.detail.secondaryColor || '#ff8000',
                })
            } catch (err: any) {
                console.error("Error fetching product:", err)
                setError("Failed to load product")
            } finally {
                setFetching(false)
            }
        }

        if (slug) {
            fetchProduct()
        }
    }, [slug])

    const ProductDTO = Yup.object({
        productName: Yup.string().required("Product name is required!"),
        category: Yup.string().required("Category is required!"),
        tagline: Yup.string().max(100, "Tagline must be 100 characters or less"),
        ingridients: Yup.string().required("Ingredients are required!"),
        nutritionalInfo: Yup.object({
            header: Yup.string().required("Nutritional header is required!"),
            rows: Yup.array()
                .of(
                    Yup.object({
                        values: Yup.string().required(),
                        perValue: Yup.string().required(),
                        perPacket: Yup.string().required(),
                    }),
                )
                .min(1, "At least one nutritional row is required!"),
            footer: Yup.string().required("Nutritional footer is required!"),
        }).required("Nutritional information is required!"),
    })

    const submitForm = async (data: typeof formData) => {
        try {
            setLoading(true)
            setError(null)

            const images = productImagesRef.current?.getImages() || []
            const directionImages = directionImagesRef.current?.getImages() || []

            const payload = new FormData()

            payload.append("name", data.productName)
            payload.append("category", data.category)
            payload.append("allergyAdvice", data.allergyAdvice)
            payload.append("vegNonVeg", data.vegNonVeg)
            payload.append("status", data.status)
            payload.append("tagline", data.tagline)
            payload.append("ingridients", data.ingridients)
            // payload.append("links", data.links)
            payload.append("primaryColor", data.primaryColor)
            payload.append("secondaryColor", data.secondaryColor)

            if (data.tags.length > 0) {
                payload.append("tags", JSON.stringify(data.tags))
            }

            payload.append("nutritionalInfo", JSON.stringify(data.nutritionalInfo))

            // images.forEach((img) => {
            //     if (img.file) {
            //         payload.append("images", img.file) // new uploaded image
            //     } else {
            //         // payload.append("existingImages", img.preview) // existing URLs
            //     }
            // })
            const existingImages = images
                .filter(img => !img.file)
                .map((img, index) => ({ url: img.url, position: index }));

            payload.append("images", JSON.stringify(existingImages));



            const newImages = images.filter(img => img.file)
            newImages.forEach(img => payload.append("images", img.file))

            // directionImages.forEach((img) => {
            //     if (img.file) {
            //         payload.append("directionImages", img.file)
            //     } else {
            //         // payload.append("existingDirectionImages", img.preview)
            //     }
            // })
            const existingDirectionImages = directionImages.filter(img => !img.file).map(img => img.preview || img.url)
            const newDirectionImages = directionImages.filter(img => img.file)
            existingDirectionImages.forEach(url => payload.append("existingDirectionImages", url))
            newDirectionImages.forEach(img => payload.append("directionImages", img.file))

            const response = await productSvc.updateProduct(product?._id || '', payload as any)
            console.log("Product updated:", response)

            setSuccess(true)

            setTimeout(() => {
                navigate("/admin/products")
            }, 1500)
        } catch (exception: any) {
            console.error("Error updating product:", exception)
            setError(exception.error || "Failed to update product")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const isValid = await ProductDTO.isValid(formData)
            if (!isValid) {
                const errors = await ProductDTO.validate(formData).catch((err) => err)
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
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Product not found</p>
                </div>
            </div>
        )
    }

    const previewProduct = {
        name: product.name,
        image: product?.images[0]?.url || '',
        status: product.status,
        category: product.category?.title,
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-gray-600 mt-2">Update product information and images</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <ProductPreview product={previewProduct} />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <AddProductPhoto defaultImages={product?.images?.map(img => typeof img === 'string' ? img : img.url)} ref={productImagesRef} heading="Update Product Images" />

                        <ProductInformation formData={formData} setFormData={setFormData} />

                        <NutritionalInfo formData={formData} setFormData={setFormData} />

                        <AddProductPhoto defaultImages={product?.directionImages?.map((img) => img.url)} ref={directionImagesRef} heading="Update Direction Images" />

                        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                Product updated successfully! Redirecting...
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
                                {loading ? "Updating..." : "Update Product"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
