import { StarIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-4">
              <div className="animate-pulse rounded-lg shadow-lg w-full aspect-[2/3] bg-gray-200 border border-gray-200"></div>
              <div className="mt-4 animate-pulse bg-gray-200 rounded-lg p-3 h-16 flex items-center justify-center shadow-sm">
                <StarIcon className="h-6 w-6 mr-2 text-gray-300" />
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 lg:w-3/4">
            <div className="animate-pulse h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded-full"></div>
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded-full"></div>
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded-full"></div>
            </div>
            
            <div className="mb-8">
              <div className="animate-pulse h-8 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="animate-pulse h-6 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="animate-pulse h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            
            <div className="mb-8">
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 p-4 rounded-lg h-20"></div>
                ))}
              </div>
            </div>
            
            <div className="animate-pulse bg-gray-100 p-6 rounded-lg mb-8 h-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}