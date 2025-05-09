import axios from 'axios';
import Link from 'next/link';
import { ChevronLeft, Star } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function GenrePage({ genre, movies = [] }) {
  if (!genre) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Alert className="max-w-md bg-white dark:bg-gray-800 shadow-sm">
          <AlertDescription className="text-center py-4">
            Genre not found. Please check the URL and try again.
          </AlertDescription>
          <div className="flex justify-center mt-4">
            <Link href="/genres">
              <Button variant="outline">
                Back to Genres
              </Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mt-2 mb-6">
          <Link href="/genres">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              <ChevronLeft size={16} />
              <span>Back to Genres</span>
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-blue-700">{genre.name} Movies</h1>

        {movies.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="block h-full">
                <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">
                      {movie.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{movie.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t">
                    <span>Year: {movie.releaseYear}</span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} className="fill-yellow-500" />
                      {movie.rating}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="bg-white shadow-sm">
            <CardContent className="text-center py-8 text-gray-600">
              No movies found in this genre.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  let paths = [];
  
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/genres`
    );
    const genres = response.data;
    paths = genres.map(genre => ({
      params: { id: genre.id.toString() },
    }));
  } catch (err) {
    console.error('Failed to fetch genres for paths:', err);
  }

  return {
    paths,
    fallback: 'blocking', // Show a fallback page while generating static pages
  };
}

export async function getStaticProps(context) {
  let genre = null;
  let movies = [];
  
  try {
    const response = await axios.get(
      `http://localhost:3000/api/genres/${context.params.id}/movies`
    );
    
    if (!response.data?.genre || Object.keys(response.data.genre).length === 0) {
      return {
        notFound: true,
      };
    }
    
    genre = response.data.genre;
    movies = response.data.movies || [];
    
  } catch (err) {
    console.error('Failed to fetch genre details:', err);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre,
      movies,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}