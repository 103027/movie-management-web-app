import Link from 'next/link';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/">
                        <span className="text-blue-600 hover:text-blue-800">← Back</span>
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 text-movieHouse">Help Center</h1>

                    <div className="prose max-w-none text-gray-700">
                        <p className="mb-6">Welcome to the Movie House help center. Choose a topic below:</p>

                        <div className="space-y-2">
                            <div>
                                <Link href="/help/faqs">
                                    <span className="text-blue-600 hover:text-blue-800">
                                        FAQs
                                    </span>
                                </Link>
                            </div>
                            <div>
                                <Link href="/help/contact">
                                    <span className="text-blue-600 hover:text-blue-800">
                                        Contact Us
                                    </span>
                                </Link>
                            </div>
                            <div>
                                <Link href="/help/privacy">
                                    <span className="text-blue-600 hover:text-blue-800">
                                        Privacy Policy
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}