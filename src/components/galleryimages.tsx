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

const POLLING_INTERVAL = 5000; 

const GalleryImages = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken") || "";
      const fetchedImages = await imageService.getAllImages(token);
      
      // Only update if images have changed
      if (JSON.stringify(fetchedImages) !== JSON.stringify(images)) {
        setImages(fetchedImages);
        setLastUpdate(new Date());
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchImages();

    // Set up polling
    const intervalId = setInterval(fetchImages, POLLING_INTERVAL);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading && images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        <p className="text-gray-500">Loading your images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-center">
        {error}
        <button 
          onClick={fetchImages}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          aria-label="Retry loading images"
        >
          Retry
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No images found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Your gallery is currently empty. Upload some images to get started.
        </p>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Image Gallery</h1>
        {lastUpdate && (
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Main Image Display */}
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg mb-6 bg-gray-100">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
        <Image
          src={selectedImage.url}
          alt={`Selected image ${selectedIndex + 1}`}
          fill
          className="object-contain"
          priority
          unoptimized={true}
          aria-live="polite"
          aria-atomic="true"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-8">
        {images.map((img, idx) => (
          <button
            key={img._id}
            onClick={() => setSelectedIndex(idx)}
            className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedIndex === idx
                ? "ring-4 ring-blue-500 scale-105"
                : "hover:ring-2 hover:ring-blue-300"
            }`}
            aria-label={`View image ${idx + 1}`}
            aria-current={selectedIndex === idx ? "true" : "false"}
          >
            <Image
              src={img.url}
              alt={`Thumbnail for image ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized={true}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 20vw"
            />
          </button>
        ))}
      </div>

      {/* Image Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Image {selectedIndex + 1} of {images.length}
            </h2>
            <p className="text-gray-500 mt-1">
              Uploaded: {new Date(selectedImage.createdAt).toLocaleString()}
            </p>
          </div>
          <button 
            onClick={fetchImages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
            aria-label="Refresh gallery"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImages;