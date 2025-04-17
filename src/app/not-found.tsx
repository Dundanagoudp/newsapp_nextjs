// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="rounded-xl shadow-lg p-8 max-w-md w-full bg-white dark:bg-gray-800">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold text-red-500 dark:text-red-400">
              404
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
  The page you&apos;re looking for doesn&apos;t exist.
</p>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}