// app/error.tsx
'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import errorAnimation from '../../../public/animations/error.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
      <div className="w-full max-w-md">
        <Lottie 
          animationData={errorAnimation} 
          loop={true}
          className="w-64 h-64 mx-auto"
        />
        
        <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Go Home
            </Link>
          </Button>
        </div>

        {error.digest && (
          <div className="mt-8 p-3 bg-gray-100 rounded text-sm">
            <p className="text-gray-500">Error ID: {error.digest}</p>
          </div>
        )}
      </div>
    </div>
  );
}
