import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MoviesPage(props) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredMovies = selectedGenre
    ? props.movies.filter(movie => movie.genreId === selectedGenre)
    : props.movies;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-movieHouse mb-4 md:mb-0">Movies</h1>
          <div className="flex items-center space-x-4">
            <label htmlFor="genre-filter" className="font-medium text-gray-700 dark:text-blue-200">
              Filter by Genre:
            </label>
            <select
              id="genre-filter"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700  dark:text-white"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map(movie => (
            <Card key={movie.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 bg-white border border-gray-100">
              <CardHeader className="pb-2">
                <Link href={`/movies/${movie.id}`} className="text-primary hover:text-blue-800 transition duration-300">
                  <CardTitle className="text-xl">
                    {movie.title}
                  </CardTitle>
                </Link>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-gray-600 mb-4 line-clamp-3">{movie.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center pt-0">
                <Badge variant="outline" className="text-sm">
                  Year: {movie.releaseYear}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                  <Star size={16} className="fill-yellow-500 stroke-yellow-500" />
                  {movie.rating}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <p className="text-gray-600 text-lg mb-6">No movies found for the selected genre.</p>
            <Button 
              onClick={() => setSelectedGenre('')}
              className="bg-movieHouse hover:bg-blue-700 text-white"
            >
              Show All Movies
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let movies = [];
  let genres = [];

  try {
    const moviesResponse = await axios.get(`http://localhost:3000/api/movies`);
    movies = moviesResponse.data;
  } catch (err) {
    console.error('Movies fetch error:', err);
  }

  try {
    const genresResponse = await axios.get(`http://localhost:3000/api/genres`);
    genres = genresResponse.data;
  } catch (err) {
    console.error('Genres fetch error:', err);
  }

  // Only return notFound if both API calls failed
  if (movies.length === 0 && genres.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movies: movies || [],
      genres: genres || [],
    },
    revalidate: 60,
  };
}