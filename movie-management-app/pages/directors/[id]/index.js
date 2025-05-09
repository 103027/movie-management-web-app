import axios from 'axios';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Film } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function DirectorDetailPage({ director, movies = [] }) {
  if (!director) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Alert className="max-w-md bg-white dark:bg-gray-800 shadow-sm">
          <AlertDescription className="text-center py-4">
            Director not found. Please check the URL and try again.
          </AlertDescription>
          <div className="flex justify-center mt-4">
            <Link href="/directors">
              <Button variant="outline">
                Back to Directors
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
          <Link href="/directors">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              <ChevronLeft size={16} />
              <span>Back to Directors</span>
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-blue-700">Director Profile</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">{director.name}</CardTitle>
              <CardDescription>Director Profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{director.biography}</p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-white dark:bg-gray-800 text-gray-600 shadow-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Filmography</CardTitle>
                <Badge variant="outline" className="text-blue-600">
                  {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {movies && movies.length > 0 ? (
                <ul className="space-y-4">
                  {movies.map(movie => (
                    <li key={movie.id} className="border-b pb-4 last:border-0">
                      <Link href={`/movies/${movie.id}`} className="group">
                        <div className="flex items-start gap-3">
                          <Film className="h-5 w-5 text-blue-500 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                              {movie.title}
                            </h3>
                            {movie.releaseYear && (
                              <p className="text-sm text-gray-500">{movie.releaseYear}</p>
                            )}
                            {movie.description && (
                              <p className="text-gray-600 mt-1 line-clamp-2">{movie.description}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No movies found for this director.
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800 border-t">
              <p className="text-sm text-gray-500">
                Total filmography: {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let director = null;
  let movies = [];
  
  try {
    const response = await axios.get(
      `http://localhost:3000/api/directors/${context.params.id}`
    );
    
    if (!response.data || !response.data.director) {
      return {
        notFound: true,
      };
    }
    
    director = response.data.director;
    movies = response.data.movies || [];
    
  } catch (err) {
    console.error('Failed to fetch director data:', err);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director,
      movies
    }
  };
}