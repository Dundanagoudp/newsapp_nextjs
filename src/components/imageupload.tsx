"use client";

import { imageService, UploadResponse } from "@/services/imageupload";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";

type UploadStatus = "idle" | "uploading" | "done" | "error";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus("uploading");
    setUploadProgress(30); 

    try {
      const token = localStorage.getItem('authToken') || '';
      const res = await imageService.uploadImage(file, token);
      
      setUploadProgress(100);
      setUploadStatus("done");
      setErrorMessage("");

      console.log("Upload response:", res);
      
      if (preview) URL.revokeObjectURL(preview);
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
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Image Upload</h2>

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-gray-300 p-8 text-center rounded-xl hover:bg-gray-100 transition-colors"
      >
        <div className="text-green-600 text-4xl mb-2">↑</div>
        <p className="text-gray-500">Click to select an image</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*"
        />
      </div>

      {errorMessage && (
        <div className={`mt-4 text-center ${
          uploadStatus === "error" ? "text-red-600" : "text-yellow-600"
        }`}>
          {errorMessage}
        </div>
      )}

      {file && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img 
                src={preview!} 
                alt="Preview" 
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <p className="font-medium truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={resetUpload}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Remove file"
            >
              ✕
            </button>
          </div>

          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  uploadStatus === "done" ? "bg-green-500" :
                  uploadStatus === "error" ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>
              {uploadStatus === "done" ? "Uploaded" :
               uploadStatus === "uploading" ? "Uploading..." :
               uploadStatus === "error" ? "Failed" : "Ready"}
            </span>
          </div>

          {["idle", "error"].includes(uploadStatus) && (
  <button
    onClick={handleUpload}
    disabled={uploadStatus !== "idle"}
    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 transition-colors"
  >
    Upload
  </button>
)}

        </div>
      )}
    </div>
  );
};

export default ImageUpload;