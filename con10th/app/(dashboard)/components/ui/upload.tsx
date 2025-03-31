"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


interface ProfilePhotoUploadProps {
  onPhotoUpload: (file: File | null) => void
  initialImage?: string;
}

export default function ProfilePhotoUpload({ onPhotoUpload, initialImage }: ProfilePhotoUploadProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (initialImage) {
      setPhotoPreview(initialImage)
    }
  }, [initialImage])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit")
        return
      }

      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("File type not supported. Please upload JPEG or PNG")
        return
      }

      const objectUrl = URL.createObjectURL(file)
      setPhotoPreview(objectUrl)

      setIsLoading(true)
      try {
        await onPhotoUpload(file)
      } catch (error) {
        console.error("Error uploading photo:", error)
        setPhotoPreview(initialImage || null)
      } finally {
        setIsLoading(false)
      }

      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    onPhotoUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }



  const handleSelectPhoto = () => {
    fileInputRef.current?.click()
  }
  

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-32 h-32 rounded-full bg-gray-100 border border-gray-300 overflow-hidden relative ${isLoading ? "opacity-70" : ""} ${!photoPreview ? "cursor-pointer" : ""}`}
        onClick={!photoPreview && !isLoading ? handleSelectPhoto : undefined}
      >
        {photoPreview ? (
          <>
            <Image src={photoPreview || "/placeholder.svg"} alt="Profile preview" fill className="object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemovePhoto()
              }}
              className="absolute top-1 right-4 bg-white rounded-full p-1 shadow-md"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col h-full w-full">
            {/* <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div> */}
            <Camera size={32} className="text-gray-400" />
          </div>
          
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="w-8 h-8 border-4 border-accent-color-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <input disabled={isLoading} type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <Button disabled={isLoading} type="button" variant="link" className="text-accent-color-700 mt-2 text-sm hover:text-accent-color-800" onClick={handleSelectPhoto}>
        {photoPreview ? "Change photo" : "Upload photo"}
      </Button>
      <p className="text-xs text-gray-500">Make sure the file is below 2MB</p>
    </div>
  )
}

