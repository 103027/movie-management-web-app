import axios from 'axios';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GenresPage({ genres }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mt-2 mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              <ChevronLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Movie Genres</h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres && genres.map(genre => (
            <Link key={genre.id} href={`/genres/${genre.id}`} className="block">
              <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600 hover:text-blue-800">
                    {genre.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  let genres = [];
  
  try {
    const response = await axios.get(
      'http://localhost:3000/api/genres'
    );
    genres = response.data;
  } catch (err) {
    console.error('Failed to fetch genres:', err);
    return {
      props: {
        genres: [],
        error: err.response?.data?.error || 'Failed to fetch genres'
      }
    };
  }

  return {
    props: {
      genres,
    }
  };
}