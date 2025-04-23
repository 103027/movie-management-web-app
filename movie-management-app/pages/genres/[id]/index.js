import { getGenres, getMoviesByGenre } from '../../../utils/data';
import Link from 'next/link';

export default function GenrePage(props) {
    if (!props.genre) {
        return <div>Genre not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/genres">
                        <span className="text-blue-600 hover:text-blue-800">← Back</span>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-8 text-movieHouse">{props.genre.name} Movies</h1>

                {props.movies.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {props.movies.map(movie => (
                            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">
                                        <Link href={`/movies/${movie.id}`}>
                                            <span className="text-blue-600 hover:text-blue-800">
                                                {movie.title}
                                            </span>
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 mb-4">{movie.description}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Year: {movie.releaseYear}</span>
                                        <span className="text-yellow-500">★ {movie.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-600">
                        No movies found in this genre.
                    </div>
                )}
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    const genres = getGenres();
    const paths = genres.map(genre => ({
        params: { id: genre.id },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const genres = getGenres();
    const genre = genres.find(g => g.id === context.params.id);

    if (!genre) {
        return {
            notFound: true,
        };
    }

    const movies = getMoviesByGenre(context.params.id);

    return {
        props: {
            genre,
            movies,
        },
        revalidate: 60,
    };
} 