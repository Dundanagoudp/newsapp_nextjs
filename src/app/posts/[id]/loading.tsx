"use client";

export default function Loading() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mb-6"></div>
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
  
        {/* Featured Image Skeleton */}
        <div className="h-96 w-full bg-gray-200 rounded-xl animate-pulse mb-12"></div>
  
        {/* Content Skeleton */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
          <div className="h-4 w-2/3 bg-gray-200 rounded-lg animate-pulse mt-6"></div>
          
          {/* Key Takeaways Skeleton */}
          <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse mt-12 mb-6"></div>
          <div className="space-y-3 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Callout Skeleton */}
          <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 my-8">
            <div className="h-5 w-24 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
            <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          {/* More Content Skeleton */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
  
        {/* Author Bio Skeleton */}
        <div className="mt-16 p-8 bg-gray-100 rounded-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="h-20 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex gap-4 mt-4">
                <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }