"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const MAX_IMAGES = 4;

interface ProductData {
  id?: string;
  title: string;
  price: number | "";
  category: string;
  description: string;
  images: File[];
  previews: string[];
}

const CreateProduct: React.FC<{ existingProduct?: ProductData }> = ({
  existingProduct,
}) => {
  const [product, setProduct] = useState<ProductData>({
    title: "",
    price: "",
    category: "",
    description: "",
    images: [],
    previews: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize with existing product if provided (for edit mode)
  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const fileArr = Array.from(files).slice(0, MAX_IMAGES - product.images.length);
    const newImages = [...product.images, ...fileArr];
    
    // Create preview URLs for new images only
    const newPreviews = fileArr.map((file) => URL.createObjectURL(file));
    
    setProduct({
      ...product,
      images: newImages,
      previews: [...product.previews, ...newPreviews],
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...product.images];
    const newPreviews = [...product.previews];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setProduct({
      ...product,
      images: newImages,
      previews: newPreviews,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare form data (including images)
      const formData = new FormData();
      formData.append("title", product.title);
      if (product.price !== "") formData.append("price", product.price.toString());
      formData.append("category", product.category);
      formData.append("description", product.description);
      
      // Append each image
      product.images.forEach((image) => {
        formData.append("images", image);
      });

      // TODO: Replace with your actual API endpoint
      const endpoint = existingProduct 
        ? `/api/products/${existingProduct.id}`
        : "/api/products";
      const method = existingProduct ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      const result = await response.json();
      console.log("Product saved:", result);
      
      // TODO: Redirect or show success message
      alert(`Product ${existingProduct ? "updated" : "created"} successfully!`);

    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {existingProduct ? "Edit Product" : "Create New Product"}
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        {/* ------------ LEFT COLUMN ------------ */}
        <div className="flex-1 space-y-6">
          {/* Product Info */}
          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Product Information</h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={product.title}
                onChange={(e) => setProduct({...product, title: e.target.value})}
                required
                placeholder="Enter product title"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
                required
                placeholder="Enter detailed product description"
                rows={5}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </section>

          {/* Images */}
          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold">Product Images</h2>
            <p className="text-xs text-gray-500 mb-2">
              You can add up to {MAX_IMAGES} images
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {product.previews.map((src, idx) => (
                <div key={idx} className="relative group">
                  <div className="h-24 w-20 overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}

              {product.previews.length < MAX_IMAGES && (
                <label
                  htmlFor="product-images"
                  className="h-24 w-20 cursor-pointer flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-center text-[10px] leading-tight text-gray-500 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Upload Image
                  <input
                    id="product-images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </section>
        </div>

        {/* ------------ RIGHT COLUMN ------------ */}
        <aside className="w-full lg:max-w-sm space-y-6">
          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Price<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  required
                  value={product.price}
                  onChange={(e) => setProduct({
                    ...product, 
                    price: Number(e.target.value)
                  })}
                  className="w-full border rounded-lg px-3 py-2 pl-7 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={product.category}
                onChange={(e) => setProduct({
                  ...product,
                  category: e.target.value
                })}
                required
                placeholder="Enter product category"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400 flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {existingProduct ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{existingProduct ? "Update Product" : "Create Product"}</>
            )}
          </button>
        </aside>
      </form>
    </div>
  );
};

export default CreateProduct;