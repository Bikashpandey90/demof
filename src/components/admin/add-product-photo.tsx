"use client"

import type React from "react"
import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { Upload, X, GripVertical } from 'lucide-react'

interface ImagePreview {
    id: string
    file: File | null
    preview: string
    type: "image" | "svg"
}

export interface AddProductPhotoHandle {
    getImages: () => ImagePreview[]
    reset: () => void
}

const AddProductPhoto = forwardRef(function AddProductPhoto(
    { heading, defaultImages = [] }: { heading: string, defaultImages?: string[] },
    ref: React.Ref<AddProductPhotoHandle>
) {
    const [images, setImages] = useState<ImagePreview[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFiles = (files: FileList | null) => {
        if (!files) return

        Array.from(files).forEach((file) => {
            if (isValidFile(file)) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const preview: ImagePreview = {
                        id: `${Date.now()}-${Math.random()}`,
                        file,
                        preview: e.target?.result as string,
                        type: file.type === "image/svg+xml" ? "svg" : "image",
                    }
                    setImages((prev) => [...prev, preview])
                }
                reader.readAsDataURL(file)
            }
        })
    }

    const isValidFile = (file: File): boolean => {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"]
        const maxSize = 5 * 1024 * 1024 // 5MB
        return validTypes.includes(file.type) && file.size <= maxSize
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const removeImage = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id))
    }

    const handleImageDragStart = (id: string) => {
        setDraggedItem(id)
    }

    const handleImageDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleImageDrop = (targetId: string) => {
        if (!draggedItem || draggedItem === targetId) return

        const draggedIndex = images.findIndex((img) => img.id === draggedItem)
        const targetIndex = images.findIndex((img) => img.id === targetId)

        const newImages = [...images]
        const [draggedImage] = newImages.splice(draggedIndex, 1)
        newImages.splice(targetIndex, 0, draggedImage)

        setImages(newImages)
        setDraggedItem(null)
    }

    const showUploadArea = images.length < 4

    useImperativeHandle(ref, () => ({
        getImages: () => images,
        reset: () => setImages([]),
    }))

    useEffect(() => {
        if (defaultImages && defaultImages.length > 0) {
            const loaded: ImagePreview[] = defaultImages.map((url) => ({
                id: `${Date.now()}-${Math.random()}`,
                file: null,
                preview: url,
                type: "image" as const,
            }))
            setImages(loaded)
        }
    }, [defaultImages])



    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">{heading}</h3>

            {showUploadArea && (
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Upload className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-foreground mb-1">
                        Drop your images here, or{" "}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-primary hover:underline font-semibold cursor-pointer"
                        >
                            click to browse
                        </button>
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF, and SVG files allowed. Max 5MB each.</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/gif,image/svg+xml"
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                    />
                </div>
            )}

            {images.length > 0 && (
                <div className="mt-6">
                    <p className="text-sm font-medium text-foreground mb-3">
                        {images.length} image{images.length !== 1 ? "s" : ""} uploaded
                        {images.length > 1 && <span className="text-xs text-muted-foreground ml-2">(drag to reorder)</span>}
                    </p>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {images.map((img, index) => (
                            <div
                                key={img.id}
                                draggable
                                onDragStart={() => handleImageDragStart(img.id)}
                                onDragOver={handleImageDragOver}
                                onDrop={() => handleImageDrop(img.id)}
                                className={`relative group rounded-lg overflow-hidden bg-muted border-2 border-border aspect-square transition-all cursor-move ${draggedItem === img.id ? "opacity-50 border-primary" : "hover:border-primary"
                                    }`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <GripVertical className="w-5 h-5 text-white drop-shadow-md" />
                                </div>

                                {img.type === "svg" ? (
                                    <div className="w-full h-full flex items-center justify-center bg-muted/50">
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <img
                                        src={img.preview || "/placeholder.svg"}
                                        alt="Product preview"
                                        className="w-full h-full object-contain"
                                    />
                                )}

                                <button
                                    onClick={() => removeImage(img.id)}
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Remove image"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>

                                <div className="absolute top-2 left-2 flex gap-2">
                                    <div className="bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">{index + 1}</div>
                                    <div className="bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">
                                        {img.type === "svg" ? "SVG" : "IMG"}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {images.length < 4 && (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 aspect-square flex flex-col items-center justify-center gap-2 transition-all group"
                            >
                                <Upload
                                    className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors"
                                    strokeWidth={1.5}
                                />
                                <span className="text-xs text-muted-foreground group-hover:text-foreground">Add more</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
})

AddProductPhoto.displayName = "AddProductPhoto"

export default AddProductPhoto
