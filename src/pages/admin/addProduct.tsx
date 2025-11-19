"use client"

import AddProductPhoto from "@/components/admin/add-product-photo"
import NutritionalInfo from "@/components/admin/nutritional-information"
import ProductInformation from "@/components/admin/product-information"
import ProductPreview from "@/components/admin/product-preview"
import productSvc from "@/services/product.service"
import { useRef, useState } from "react"
import * as Yup from "yup"

export default function ProductForm() {
    const productImagesRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const directionImagesRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)

    const [product] = useState({
        name: "Mug Shot Sachet",
        category: "SACHETS",
        image: "/mugshotsachet.png",
        status: 'active'
    })

    const [formData, setFormData] = useState({
        productName: "",
        category: "SACHETS",
        allergyAdvice: "",
        vegStatus: "Vegetarian",
        status: "active",
        tagline: "",
        ingridients: "",
        tags: [],
        links: "",
        nutritionalInfo: {
            header: "",
            rows: [{ values: "", perValue: "", perPacket: "" }],
            footer: "",
        }
    })



    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const ProductDTO = Yup.object({
        productName: Yup.string().required("Product name is required!"),
        category: Yup.string().required("Category is required!"),
        tagline: Yup.string().max(100, "Tagline must be 100 characters or less"),
        ingridients: Yup.string().required("Ingredients are required!"),
        nutritionalInfo: Yup.object({
            header: Yup.string().required("Nutritional header is required!"),
            rows: Yup.array().of(
                Yup.object({
                    values: Yup.string().required(),
                    perValue: Yup.string().required(),
                    perPacket: Yup.string().required(),
                })
            ).min(1, "At least one nutritional row is required!"),
            footer: Yup.string().required("Nutritional footer is required!"),
        }).required("Nutritional information is required!"),
    })

    const submitForm = async (data: typeof formData) => {
        try {
            setLoading(true)
            setError(null)

            const images = productImagesRef.current?.getImages() || []
            const directionImages = directionImagesRef.current?.getImages() || []

            // Build FormData payload
            const payload = new FormData()

            // Append form fields
            payload.append('name', data.productName)
            payload.append('category', data.category)
            payload.append('allergyAdvice', data.allergyAdvice)
            payload.append('vegStatus', data.vegStatus)
            payload.append('status', data.status)
            payload.append('tagline', data.tagline)
            payload.append('ingridients', data.ingridients)
            payload.append('links', data.links)

            if (data.tags.length > 0) {
                payload.append('tags', JSON.stringify(data.tags))
            }

            payload.append('nutritionalInfo', JSON.stringify(data.nutritionalInfo))

            // Append image files
            images.forEach((img) => {
                payload.append(`images`, img.file)
            })

            directionImages.forEach((img) => {
                payload.append(`directionImages`, img.file)
            })

            for (let p of payload.entries()) console.log(p)


            const response = await productSvc.createProduct(payload as any)
            console.log(response)

            setSuccess(true)

            // Reset form after success
            setTimeout(() => {
                setFormData({
                    productName: "",
                    category: "SACHETS",
                    allergyAdvice: "",
                    vegStatus: "Vegetarian",
                    status: "active",
                    tagline: "",
                    ingridients: "",
                    tags: [],
                    links: "",
                    nutritionalInfo: {
                        header: "",
                        rows: [{ values: "", perValue: "", perPacket: "" }],
                        footer: "",
                    }
                })
                productImagesRef.current?.reset()
                directionImagesRef.current?.reset()
                setSuccess(false)
            }, 2000)
        } catch (exception: any) {
            console.error("[v0] Error creating product:", exception)
            setError(exception.error || "Failed to create product")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("[v0] Current formData:", formData)

        try {
            await ProductDTO.validate(formData)
            await submitForm(formData)
        } catch (err: any) {
            setError(err.message)
        }
    }



    return (
        <div className="min-h-screen bg-transparent">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <ProductPreview product={product} />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <AddProductPhoto ref={productImagesRef} heading="Add Product Images" />

                        <ProductInformation
                            formData={formData}
                            setFormData={setFormData}
                        />

                        <NutritionalInfo
                            formData={formData}
                            setFormData={setFormData}
                        />

                        <AddProductPhoto ref={directionImagesRef} heading="Add Direction Images" />

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                Product created successfully!
                            </div>
                        )}

                        <div className="mt-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => {
                                    setFormData({
                                        productName: "",
                                        category: "SACHETS",
                                        allergyAdvice: "",
                                        vegStatus: "Vegetarian",
                                        status: "active",
                                        tagline: "",
                                        ingridients: "",
                                        tags: [],
                                        links: "",
                                        nutritionalInfo: {
                                            header: "",
                                            rows: [{ values: "", perValue: "", perPacket: "" }],
                                            footer: "",
                                        }
                                    })
                                    productImagesRef.current?.reset()
                                    directionImagesRef.current?.reset()
                                    setError(null)
                                }}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-3 bg-[#487FFF] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating..." : "Create Product"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
