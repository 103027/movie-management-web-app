import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HelpInfo() {
    const helpContent = {
        faqs: {
            title: 'Frequently Asked Questions',
            content: `
                1. How do I search for movies?
                   Use the search bar at the top of the page to find movies by title or director.
          
                2. How are movies rated?
                   Movies are rated on a scale of 1-10 based on user ratings.
          
                3. Can I contribute to the movie database?
                   Currently, this is a read-only database for demonstration purposes.
              `,
        },
        contact: {
            title: 'Contact Us',
            content: `
                Email: support@moviehouse.com
                Phone: 1-800-MOVIES
                
                We're available Monday through Friday, 9 AM to 5 PM EST.
              `,
        },
        privacy: {
            title: 'Privacy Policy',
            content: `
                This is a demo application. No personal data is collected or stored.
                The movie information is stored locally and used for demonstration purposes only.
              `,
        },
    };
    const router = useRouter();
    const { slug } = router.query;

    if (!slug) {
        return <div>Loading...</div>;
    }

    const pageKey = slug[0];

    if (!helpContent[pageKey]) {
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

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/help">
                        <span className="text-blue-600 hover:text-blue-800">← Back to Help</span>
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 text-movieHouse">{helpContent[pageKey].title}</h1>

                    <div className="prose max-w-none">
                        <p className="mb-6 text-gray-700 whitespace-pre-line">{helpContent[pageKey].content}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}