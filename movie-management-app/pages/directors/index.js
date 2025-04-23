import useSWR from 'swr';
import Link from 'next/link';

export default function DirectorsPage() {
  const fetcher = () => fetch('/api/directors').then((res) => res.json());
  const { data: directors, error, isLoading } = useSWR('/api/directors', fetcher);

  if (error) return <div>Failed to load directors</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-movieHouse">Directors</h1>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map(director => (
            <div key={director.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">{director.name}</h2>
              <p className="text-gray-600 mb-4">{director.biography}</p>
              
              {director.movies && director.movies.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Movies:</h3>
                  <ul className="space-y-1">
                    {director.movies.map(movie => (
                      <li key={movie.id}>
                        <Link href={`/movies/${movie.id}`}>
                          <span className="text-blue-600 hover:text-blue-800">
                            {movie.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 