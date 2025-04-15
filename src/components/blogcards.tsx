"use client";


// components/BlogCards.tsx


import Image from "next/image";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const blogs = [
  {
    id: 1,
    title: "‘ಮಾಂಗಲ’, ಧಾರಾವಾಹಿ ಖ್ಯಾತಿಯ ನಟ ಮುನಿರಂಜನ್ ಮತ್ತು ಪವರ್‌ಸ್ಟಾರ್ ಲೈಫ್ ಬಗ್ಗೆ ನಿಮ್ಮಿಷ್ಟ ಗೊತ್ತಾ?",
    duration: "05:41",
    imageUrl: "/post2.jpg",
    description: "ಮುನಿರಂಜನ್: ಧಾರಾವಾಹಿ ಖ್ಯಾತಿಯ ನಟ ಮುನಿರಂಜನ್ ಲೈಫ್ ಬಗ್ಗೆ ನಿಖರವಾದ ವಿವರ.",
  },
  {
    id: 2,
    title: "ನಾನು ಮದುವೆ ಆಗುವ ಹುದುಗಿದೆ! ಕೊಟ್ಟ ಟ್ರ್ಯಾಕ್ಟ್ ತ್ರಿಪ್ರಕಾಯ್",
    duration: "04:41",
    imageUrl: "/post2.jpg",
    description: "ಮದುವೆ ಬಗ್ಗೆ ಆಫೀಶಿಯಲ್ ಕೊಟ್ಟ ತ್ರಿಪ್ರಕಾಯ್ ಹೇಳಿದ್ದೇನು ನೋಡಿ.",
  },
  {
    id: 3,
    title: "ರೋಹಿತ್ ಜೋಡಿ ಲವ್ ಗಾಸಿಪ್! ರೈಮಾ ಪ್ರೀತಿ ವಿವರ.",
    duration: "04:41",
    imageUrl: "/post2.jpg",
    description: "ರೋಹಿತ್ ಜೋಡಿಯ ಪ್ರೇಮ ಕಥೆಗಳಲ್ಲಿ ಏನು ನಡೆಯುತ್ತಿದೆ?",
  },
  {
    id: 4,
    title: "ಪುಟ್ಟಗೋರಿ ಪಾಟ್-2 ಅಳೆ ಓಪನ್..! ಧಾರಾವಾಹಿ ಗಾಸಿಪ್",
    duration: "16:39",
    imageUrl: "/post2.jpg",
    description: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಧಾರಾವಾಹಿಯ ಹಿಂದಿನ ಕಥೆಗಳು.",
  },
  {
    id: 5,
    title: "ಪುಟ್ಟಗೋರಿ ಪಾಟ್-2 ಅಳೆ ಓಪನ್..! ಧಾರಾವಾಹಿ ಗಾಸಿಪ್",
    duration: "16:39",
    imageUrl: "/post2.jpg",
    description: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಧಾರಾವಾಹಿಯ ಹಿಂದಿನ ಕಥೆಗಳು.",
  },
  {
    id: 6,
    title: "ಪುಟ್ಟಗೋರಿ ಪಾಟ್-2 ಅಳೆ ಓಪನ್..! ಧಾರಾವಾಹಿ ಗಾಸಿಪ್",
    duration: "16:39",
    imageUrl: "/post2.jpg",
    description: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಧಾರಾವಾಹಿಯ ಹಿಂದಿನ ಕಥೆಗಳು.",
  },
];

export default function BlogCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full py-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Latest News</h2>
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-gray-700" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[170px] w-full">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                 
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold leading-tight line-clamp-2 h-[3em]">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 h-[3em]">
                    {blog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}