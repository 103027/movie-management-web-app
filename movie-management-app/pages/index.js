import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home(props) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-movieHouse">Welcome to Movie House</h1>

        <div className="flex justify-center mb-8">
          <Button 
            onClick={() => router.push('/genres')} 
            className="bg-movieHouse hover:bg-blue-700 text-white"
          >
            Browse Genres
          </Button>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-movieHouse">Trending Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.movies.map((movie) => (
              <Card key={movie.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border border-gray-100 dark:bg-gray-800">
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
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/movies`
    );
    const movies = response.data;
    const indexArray = movies.map((_, i) => i);
    indexArray.sort((a, b) => movies[b].rating - movies[a].rating);
    var trendingMovies = indexArray.map(i => movies[i]);
    
    return {
      props: {
        movies: trendingMovies,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return {
      props: {
        movies: [],
      },
      revalidate: 60,
    };
  }
}