import { getMovie, getDirector, getMoviesByDirector } from '../../../../utils/data';
import Link from 'next/link';

export default function DirectorDetails(props) {
    if (!props.director) {
        return <div>Director not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href={`/movies/${props.directorMovies[0].id}`}>
                        <span className="text-blue-600 hover:text-blue-800">← Back</span>
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-movieHouse">{props.director.name}</h1>
                    <div className="space-y-6">
                        <div className="text-gray-700">
                            <h2 className="text-xl font-semibold mb-2">Biography</h2>
                            <p>{props.director.biography}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Movies by {props.director.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {props.directorMovies.map((movie) => (
                                    <div key={movie.id} className="border rounded-lg p-4">
                                        <Link href={`/movies/${movie.id}`}>
                                            <span className="text-blue-600 hover:text-blue-800 font-medium">
                                                {movie.title}
                                            </span>
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-2">{movie.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const movie = getMovie(context.params.id);
    const director = getDirector(movie.directorId);
    const directorMovies = getMoviesByDirector(movie.directorId);

    if (!movie) {
        return {
            notFound: true,
        };
    }

    if (!director) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            director,
            directorMovies,
        },
        revalidate: 60,
    };
} 