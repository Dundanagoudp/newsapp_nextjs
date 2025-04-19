// import GalleryImages from '@/components/galleryimages'
import GalleryImages from '@/components/galleryimages'
import ImageUpload from '@/components/imageupload'
import React from 'react'

const Page = () => {
  return (
    <div className="flex min-h-screen p-4 gap-4 bg-gray-100">
      {/* Left: Upload Section */}
      <div className="w-[40%] bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <ImageUpload />
      </div>

      {/* Right: Gallery Section */}
      <div className="w-[60%] bg-white p-4 rounded-xl shadow-md overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Gallery</h2>
        <GalleryImages />
      </div>
    </div>
  )
}

export default Page
