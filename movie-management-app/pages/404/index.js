import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
                <Link href="/">
                    <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Go Home
                    </span>
                </Link>
            </div>
        </div>
    );
} 