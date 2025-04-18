"use client";

import { imageService, UploadResponse } from "@/services/imageupload";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";

type UploadStatus = "idle" | "uploading" | "done" | "error";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setErrorMessage("Only image files are allowed");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB");
        return;
      }
      setErrorMessage("");
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadStatus("idle");
      setSuccessMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus("uploading");
    setUploadProgress(30);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem('authToken') || '';
      const res = await imageService.uploadImage(file, token);
      
      setUploadProgress(100);
      setUploadStatus("done");
      setSuccessMessage("Image uploaded successfully!");
      setErrorMessage("");

      console.log("Upload response:", res);
      
      if (preview) URL.revokeObjectURL(preview);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        resetUpload();
      }, 3000);
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setErrorMessage(err.message || "Upload failed");
      setUploadProgress(0);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus("idle");
    setErrorMessage("");
    setSuccessMessage("");
    setUploadProgress(0);
    if (preview) URL.revokeObjectURL(preview);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Upload Your Image
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Supported formats: JPEG, PNG, WEBP (Max 5MB)
      </p>

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-blue-200 p-12 text-center rounded-xl hover:bg-blue-50 transition-all duration-300 group"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-700 mb-1">
              Drag & drop or click to browse
            </p>
            <p className="text-sm text-gray-500">
              High resolution images work best
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*"
          />
        </div>
      ) : (
        <div className="text-center">
          {successMessage ? (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg mb-6 flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="font-medium">{successMessage}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  {preview && (
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-800 truncate max-w-[180px]">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {file.type.split('/')[1].toUpperCase()} file
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetUpload}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Remove file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      uploadStatus === "done"
                        ? "bg-green-500"
                        : uploadStatus === "error"
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-blue-500 to-blue-400"
                    }`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>
                    {uploadStatus === "done"
                      ? "Complete"
                      : uploadStatus === "uploading"
                      ? "Uploading..."
                      : uploadStatus === "error"
                      ? "Failed"
                      : "Ready to upload"}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>

              {["idle", "error"].includes(uploadStatus) && (
                <button
                  onClick={handleUpload}
                  disabled={uploadStatus !== "idle"}
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload Image
                </button>
              )}
            </>
          )}
        </div>
      )}

      {errorMessage && (
        <div
          className={`mt-6 p-4 text-center rounded-lg border ${
            uploadStatus === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          } flex items-start gap-3`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;