import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DirectorsPage() {
  const router = useRouter();
  const fetcher = () => fetch('/api/directors').then((res) => res.json());
  const { data: directors, error, isLoading } = useSWR('/api/directors', fetcher);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <Alert className="max-w-md bg-white dark:bg-gray-800 shadow-sm border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-red-500 font-medium">
              Failed to load directors
            </AlertDescription>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white">
              Try Again
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-lg text-gray-700 dark:text-gray-400">Loading directors...</p>
        </div>
      </div>
    );
  }

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

        <h1 className="text-3xl font-bold mb-8 text-blue-700">Directors</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors && directors.map(director => (
            <Card 
              key={director.id} 
              className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/directors/${director.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">{director.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {director.biography}
                </CardDescription>
              </CardContent>
              <div className="px-6 pb-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-gray-800 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/directors/${director.id}`);
                  }}
                >
                  <span className="mr-1">View profile</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}