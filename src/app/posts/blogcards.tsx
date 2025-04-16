"use client";

import { fetchPostsWithId, PostWithId } from "@/services/postapi";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function BlogCards() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<PostWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPostsWithId();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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

  

  const handleReadMore = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const getImageUrl = (postId: number) => {
    return `https://picsum.photos/seed/post-${postId}/300/170`;
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="w-full py-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Latest News</h2>
          <div className="flex gap-2">
            <ScrollButton direction="left" onClick={scrollLeft} />
            <ScrollButton direction="right" onClick={scrollRight} />
          </div>
        </div>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          >
            {posts.map((postWithId) => (
              <BlogCard 
                key={postWithId.id}
                post={postWithId}
                onReadMore={handleReadMore}
                imageUrl={getImageUrl(postWithId.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for better organization
const LoadingSkeleton = () => (
  <div className="w-full py-4 mt-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Latest News</h2>
        {/* Remove scroll buttons during loading */}
        <div className="flex gap-2 opacity-0"> {/* Hide buttons but maintain layout */}
          <div className="p-2 rounded-full bg-gray-100">
            <FiChevronLeft className="text-gray-700" />
          </div>
          <div className="p-2 rounded-full bg-gray-100">
            <FiChevronRight className="text-gray-700" />
          </div>
        </div>
      </div>
      {/* Remove overflow-x-auto to prevent scrolling during loading */}
      <div className="flex gap-6 pb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="animate-pulse">
              <div className="h-[170px] w-full bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="w-full py-4 mt-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Latest News</h2>
      </div>
      <div className="text-center py-8 text-red-500">{error}</div>
    </div>
  </div>
);

const ScrollButton = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
    aria-label={`Scroll ${direction}`}
  >
    {direction === 'left' ? 
      <FiChevronLeft className="text-gray-700" /> : 
      <FiChevronRight className="text-gray-700" />}
  </button>
);

const BlogCard = ({ post, onReadMore, imageUrl }: { 
  post: PostWithId, 
  onReadMore: (id: number) => void, 
  imageUrl: string 
}) => (
  <div className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
    <div className="relative h-[170px] w-full">
      <Image
        src={imageUrl}
        alt={post.post.title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        unoptimized 
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-sm font-semibold leading-tight line-clamp-2 h-[3em]">
        {post.post.title}
      </h3>
      <p className="text-xs text-gray-600 mt-2 line-clamp-2 h-[3em] flex-grow">
        {post.post.body}
      </p>
      <button
        onClick={() => onReadMore(post.id)}
        className="mt-4 flex items-center gap-1 text-black text-xs font-medium hover:text-gray-600 transition-colors group"
      >
        Read More
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);