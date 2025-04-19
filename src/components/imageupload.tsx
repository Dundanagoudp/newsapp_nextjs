"use client";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useRef, ChangeEvent } from "react";
import { storage } from "@/lib/firebase.config";
import Image from "next/image";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError("Only image files are allowed");
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setStatus("idle");
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setError("");

    try {
      // Create storage reference
      const storageRef = ref(storage, `images/${file.name}`);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const url = await getDownloadURL(snapshot.ref);
      
      setDownloadURL(url);
      setStatus("success");
      
      // Clean up preview URL
      if (preview) URL.revokeObjectURL(preview);
      
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("error");
      setError("Failed to upload image. Please try again.");
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setDownloadURL("");
    setStatus("idle");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (preview) URL.revokeObjectURL(preview);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
      
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Upload Area */}
      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600">
              Click to select an image or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              (JPEG, PNG, WEBP up to 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative h-48 w-full rounded-md overflow-hidden border">
            <Image
              src={preview || ""}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          
          {/* File Info */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button 
              onClick={resetUpload}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={status === "uploading"}
            className={`w-full py-2 px-4 rounded-md text-white ${
              status === "uploading" 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {status === "uploading" ? "Uploading..." : "Upload Image"}
          </button>
          
          {/* Status Messages */}
          {status === "success" && (
            <div className="p-3 bg-green-50 text-green-700 rounded-md">
              <p>Upload successful!</p>
              {downloadURL && (
                <a 
                  href={downloadURL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm block mt-1"
                >
                  View uploaded image
                </a>
              )}
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}