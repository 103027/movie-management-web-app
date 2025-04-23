import { useRouter } from 'next/router';
import { getMovies } from '../utils/data';
import Link from 'next/link';

export default function Home(props) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-movieHouse">Welcome to Movie House</h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => router.push('/genres')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Browse Genres
          </button>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-movieHouse">Trending Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/movies/${movie.id}`}>
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        {movie.title}
                      </span>
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{movie.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Year: {movie.releaseYear}</span>
                    <span className="text-sm font-semibold text-yellow-500">★ {movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const movies = getMovies();
  const indexArray = movies.map((_, i) => i);
  indexArray.sort((a, b) => movies[b].rating - movies[a].rating);
  const trendingMovies = indexArray.map(i => movies[i]);


  return {
    props: {
      movies: trendingMovies,
    },
    revalidate: 60, // Revalidate every minute
  };
}
