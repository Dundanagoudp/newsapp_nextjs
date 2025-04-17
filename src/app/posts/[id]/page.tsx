// app/posts/[id]/page.tsx
import { fetchPost } from "@/services/postapi";
import Image from "next/image";
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';

export default async function PostPage({ params }: { params: { id: string } }) {
  try {
    // Add artificial delay to see the loading effect (remove in production)
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3000); // 3 second delay
    
    const post = await fetchPost(Number(params.id));

    return (
      <Suspense fallback={<Loading />}>
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                Category
              </span>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              This is a compelling excerpt that summarizes the post content and entices readers to continue.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/author-${params.id}/100/100`}
                  alt="Author"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">5 min read</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={`https://picsum.photos/seed/post-${params.id}/1600/900`}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              {post.body}
            </p>
            
            {/* Additional content sections */}
            <h2 className="text-2xl font-bold mt-12 mb-6">Key Takeaways</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-2 h-2 bg-indigo-600 rounded-full"></span>
                <span>Important point from the article</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-2 h-2 bg-indigo-600 rounded-full"></span>
                <span>Another key insight to remember</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-2 h-2 bg-indigo-600 rounded-full"></span>
                <span>Final takeaway for the reader</span>
              </li>
            </ul>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-8">
              <h3 className="text-lg font-semibold mb-3">Did you know?</h3>
              <p className="text-gray-700">
                This is an interesting fact or related information that complements the main content.
              </p>
            </div>
            
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              More post content would go here. In a real implementation, you might have multiple paragraphs,
              images, and other rich content elements.
            </p>
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-8 bg-gray-50 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={`https://picsum.photos/seed/author-${params.id}/200/200`}
                  alt="Author"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">About John Doe</h3>
                <p className="text-gray-600">
                  John is a passionate writer with over 10 years of experience in the tech industry.
                  He loves sharing insights about web development, design, and productivity.
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">Twitter</a>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">LinkedIn</a>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800">Website</a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Suspense>
    );
  }  catch {
    notFound();
  }
  
}