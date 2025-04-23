import { getMovie, getMovies, getDirector } from '../../../utils/data';
import Link from 'next/link';

export default function MovieDetails(props) {
    if (!props.movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/">
                        <span className="text-blue-600 hover:text-blue-800"> ← Back</span>
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-movieHouse">{props.movie.title}</h1>
                    <div className="space-y-4">
                        <p className="text-gray-700">{props.movie.description}</p>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">Director:</span>
                            <Link href={`/movies/${props.movie.id}/director`}>
                                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                    {props.director.name}
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2"> 
                            <span className="font-semibold text-gray-700">Release Year:</span>
                            <span className="text-gray-700">{props.movie.releaseYear}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">Rating:</span>
                            <span className="text-yellow-500">★ {props.movie.rating}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    const movies = getMovies();
    const paths = movies.map((movie) => ({
        params: { id: movie.id },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const movie = getMovie(context.params.id);

    if (!movie) {
        return {
            notFound: true,
        };
    }

    const director = getDirector(movie.directorId);

    return {
        props: {
            movie,
            director,
        },
        revalidate: 60, // Revalidate every minute
    };
} 