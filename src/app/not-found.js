import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-2xl font-bold text-emerald-600 mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
}