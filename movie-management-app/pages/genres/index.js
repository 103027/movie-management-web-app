import { getGenres } from '../../utils/data';
import Link from 'next/link';

export default function GenresPage({ genres }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/">
                        <span className="text-blue-600 hover:text-blue-800">← Back</span>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold mb-8 text-movieHouse">Movie Genres</h1>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {genres.map(genre => (
                        <Link key={genre.id} href={`/genres/${genre.id}`}>
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 cursor-pointer">
                                <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                                    {genre.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

export async function getStaticProps() {
    const genres = getGenres();

    return {
        props: {
            genres,
        },
        revalidate: 60, // Revalidate every minute
    };
}