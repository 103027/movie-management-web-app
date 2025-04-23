import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-600 transition duration-300">
                  <span className="font-bold text-xl text-movieHouse">Movie House</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <Link href="/movies">
                <span className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition duration-300 ${
                  isActive('/movies')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                }`}>
                  Movies
                </span>
              </Link>

              <Link href="/genres">
                <span className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition duration-300 ${
                  isActive('/genres')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                }`}>
                  Genres
                </span>
              </Link>

              <Link href="/directors">
                <span className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition duration-300 ${
                  isActive('/directors')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                }`}>
                  Directors
                </span>
              </Link>

              <Link href="/help">
                <span className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition duration-300 ${
                  isActive('/help')
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
                }`}>
                  Help
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Add padding to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
} 