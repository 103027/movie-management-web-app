import { getMovies, getGenres } from '../../utils/data';
import Link from 'next/link';
import { useState } from 'react';

export default function MoviesPage(props) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredMovies = selectedGenre
    ? props.movies.filter(movie => movie.genreId === selectedGenre)
    : props.movies;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-movieHouse">Movies</h1>
          <div className="flex items-center space-x-4">
            <label htmlFor="genre-filter" className="font-medium text-gray-700">
              Filter by Genre:
            </label>
            <select
              id="genre-filter"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-700"
            >
              <option value="">All Genres</option>
              {props.genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map(movie => (
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

        {filteredMovies.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No movies found for the selected genre.
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const movies = getMovies();
  const genres = getGenres();

  if (!movies) {
    return {
      notFound: true,
    };
  }

  if (!genres) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 60,
  };
} 