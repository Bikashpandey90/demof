"use client"

import AddCategoryPhoto from "@/components/admin/add-category-photo"
import CategoryInformation from "@/components/admin/categoryInformation"
import CategoryPreview from "@/components/admin/product-preview"
import categorySvc from "@/services/category.service"
import { useRef, useState } from "react"
import * as Yup from "yup"

export default function CategoryForm() {
    // const photoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const mainPhotoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const bowlPhotoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)
    const ingPhotoRef = useRef<{ getImages: () => any[]; reset: () => void }>(null)


    const [product] = useState({
        name: "Mug Shot Sachet",
        image: "/mugshotsachet.png",
        status: 'active',
        category: "Sachets"

    })

    const [formData, setFormData] = useState({
        productName: "Mug Shot Sachet",
        status: "active",
        primaryColor: "#ff8000",
        secondaryColor: "#ff8000",
        backgroundColor: '#ff8000'
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

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



            if (!mainImage || !mainImage.file) {
                setError("Please upload at least one main category image")
                setLoading(false)
                return
            }


            const formDataToSend = new FormData()
            formDataToSend.append('title', data.productName)
            formDataToSend.append('status', data.status)
            formDataToSend.append("primaryColor", data.primaryColor)
            formDataToSend.append("secondaryColor", data.secondaryColor)
            formDataToSend.append("backgroundColor", data.backgroundColor)



            if (mainImage?.file) {
                formDataToSend.append('image', mainImage.file)
            }
            if (bowlImage?.file) {
                formDataToSend.append('bowlImage', bowlImage.file)
            }
            if (ingImage?.file) {
                formDataToSend.append('ingridientsImage', ingImage.file)
            }

            console.log('this is the category being submitted : ', formDataToSend)
            const response = await categorySvc.createCategory(formDataToSend as any)
            console.log("Category created:", response)

            setSuccess(true)

            //add toast here
            // Reset form after success

            setTimeout(() => {
                setFormData({
                    productName: "",
                    status: "active",
                    primaryColor: "#ff8000",
                    secondaryColor: "#ff8000",
                    backgroundColor: '#ff8000'

                })
                mainPhotoRef.current?.reset()
                bowlPhotoRef.current?.reset()
                ingPhotoRef.current?.reset()
                setSuccess(false)
            }, 2000)
        } catch (exception: any) {
            console.error("Error creating category:", exception)
            setError(exception.error || "Failed to create category")
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

    return (
        <div className="min-h-screen bg-transparent">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <CategoryPreview product={product} />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <AddCategoryPhoto ref={mainPhotoRef} heading={"Add Category Photos"} />

                        <CategoryInformation
                            formData={formData}
                            setFormData={setFormData}
                        />

                        <AddCategoryPhoto ref={bowlPhotoRef} heading={"Add Bowl Image"} />
                        <AddCategoryPhoto ref={ingPhotoRef} heading={"Add Ingridients Image"} />


                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                Category created successfully!
                            </div>
                        )}

                        <div className="mt-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => {
                                    setFormData({
                                        productName: "",
                                        status: "Active",
                                        primaryColor: "#ff8000",
                                        secondaryColor: "#ff8000",
                                        backgroundColor: '#ff8000'
                                    })
                                    mainPhotoRef.current?.reset()
                                    bowlPhotoRef.current?.reset()
                                    ingPhotoRef.current?.reset()

                                    setError(null)
                                }}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full sm:flex-1 px-4 sm:px-6 py-3 bg-[#487FFF] text-white font-semibold rounded-lg hover:bg-[#487ffa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating..." : "Create Category"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
