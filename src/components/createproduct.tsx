"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

// maximum number of images a merchant can attach (UI only – enforce again on the server!)
const MAX_IMAGES = 4;

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discountedPrice, setDiscountedPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [tags, setTags] = useState<string[]>(["Trending"]);
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const fileArr = Array.from(files).slice(0, MAX_IMAGES);
    setImages(fileArr);

    // revoke old URLs to avoid memory leaks
    previews.forEach((url) => URL.revokeObjectURL(url));

    const urls = fileArr.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) setTags((prev) => [...prev, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with your API layer or mutate react‑query cache here
    // data example (images need to be uploaded via FormData or a presigned URL):
    // {
    //   title,
    //   price,
    //   discountedPrice,
    //   category,
    //   collection,
    //   tags,
    //   brand,
    //   images
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      {/* ------------ LEFT COLUMN ------------ */}
      <div className="flex-1 space-y-6">
        {/* Product Info */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Product Info</h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Solid T‑Shirt"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Media */}
          <div>
            <p className="text-sm font-medium">
              Product Media <span className="text-gray-400">(optional)</span>
            </p>
            <p className="text-xs text-gray-500 mb-2">
              You can add up to 4 images and 1 video
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="h-24 w-20 overflow-hidden rounded-lg border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}

              {previews.length < MAX_IMAGES && (
                <label
                  htmlFor="product-images"
                  className="h-24 w-20 cursor-pointer flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-center text-[10px] leading-tight text-gray-500 hover:bg-gray-50"
                >
                  {/* plus icon */}
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
                  <span className="underline">or add video link</span>
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
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Pricing</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 pl-7 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Discounted price */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Discounted Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 pl-7 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ------------ RIGHT COLUMN ------------ */}
      <aside className="w-full lg:max-w-sm space-y-6">
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Collection */}
          <div>
            <label className="block text-sm font-medium mb-1">Collection</label>
            <input
              type="text"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              placeholder="Select or create a collection"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Tags</label>
            <input
              type="text"
              placeholder="Select or create a tag"
              onKeyDown={(e) => {
                const value = (e.target as HTMLInputElement).value.trim();
                if (e.key === "Enter" && value) {
                  e.preventDefault();
                  handleAddTag(value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-1">Brand Name</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Select or create a brand"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* SEO link */}
          <button
            type="button"
            className="w-full text-indigo-600 text-sm font-medium underline"
          >
            Edit SEO settings
          </button>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Save Product
        </button>
      </aside>
    </form>
  );
};

export default CreateProduct;
