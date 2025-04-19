"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { imageService } from "@/services/imageupload";
import { UploadCloud, CheckCircle, XCircle } from "lucide-react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<{ id: string; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        resetUpload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("File must be smaller than 5MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError("");
    setStatus("idle");
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setUploadProgress(0);
    setError("");
    setUploadedImage(null);

    const simulateProgress = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(simulateProgress);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const res = await imageService.uploadImage(file);
      clearInterval(simulateProgress);
      setUploadProgress(100);
      setStatus("success");
      setUploadedImage({
        id: res.data.id,
        url: res.data.url,
      });
    } catch (err) {
      clearInterval(simulateProgress);
      setStatus("error");
      setError("Upload failed. Please try again.");
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setError("");
    setUploadProgress(0);
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Image Uploader</h2>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!file && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center cursor-pointer hover:border-blue-400 transition"
        >
          <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload image (max 5MB)</p>
        </div>
      )}

      {file && (
        <div className="space-y-4">
          <div className="relative w-full h-48 border rounded-md overflow-hidden">
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={resetUpload}
              className="text-red-500 hover:text-red-700"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          {status === "uploading" && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 text-right">{uploadProgress}%</p>
            </>
          )}

          <button
            onClick={handleUpload}
            disabled={status === "uploading"}
            className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2 ${
              status === "uploading"
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {status === "success" ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Uploaded
              </>
            ) : (
              "Upload"
            )}
          </button>

          {status === "error" && (
            <div className="p-2 bg-red-100 text-red-700 rounded-md text-sm flex gap-2 items-center">
              <XCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {status === "success" && uploadedImage && (
            <div className="p-2 bg-green-100 text-green-700 rounded-md text-sm flex flex-col">
              <span className="flex gap-2 items-center">
                <CheckCircle className="w-5 h-5" />
                Uploaded successfully!
              </span>
              <a
                href={uploadedImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs mt-1 break-all"
              >
                {uploadedImage.url}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
