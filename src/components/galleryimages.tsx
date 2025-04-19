"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageService } from "@/services/imageupload";

export interface UploadedImage {
  _id: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const GalleryImages = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken") || "";
        const fetchedImages = await imageService.getAllImages(token);
        setImages(fetchedImages);
        setError(null);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err instanceof Error ? err.message : "Failed to load images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No images uploaded yet.</p>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Image Gallery</h1>

      {/* Main Image Display */}
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg mb-6 bg-gray-100">
        <Image
          src={selectedImage.url}
          alt={`Uploaded image ${selectedIndex + 1}`}
          fill
          className="object-contain"
          priority
          unoptimized // Important for Firebase URLs
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div
            key={img._id}
            onClick={() => setSelectedIndex(idx)}
            className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 ${
              selectedIndex === idx
                ? "ring-4 ring-blue-500 scale-105"
                : "hover:ring-2 hover:ring-blue-300"
            }`}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized // Important for Firebase URLs
            />
          </div>
        ))}
      </div>

      {/* Image Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">
          Image {selectedIndex + 1}
        </h2>
        <p className="text-gray-500 mt-1">
          Uploaded: {new Date(selectedImage.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-500">User ID: {selectedImage.userId}</p>
      </div>
    </div>
  );
};

export default GalleryImages;