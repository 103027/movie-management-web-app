import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function MovieDetails(props) {
    if (!props.movie) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
                    <Link href="/">
                        <span className="text-blue-600 hover:text-blue-800">← Back to Home</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/">
                        <span className="text-blue-600 hover:text-blue-800">← Back</span>
                    </Link>
                </div>
                
                <Card className="overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 shadow-md">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-3xl font-bold text-movieHouse">{props.movie.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-400">{props.movie.description}</p>
                        
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-400">Director:</span>
                            <Link href={`/movies/${props.movie.id}/director`}>
                                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                    {props.director.name}
                                </span>
                            </Link>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700 dark:text-gray-400">Release Year:</span>
                            <span className="text-gray-700 dark:text-gray-400">{props.movie.releaseYear}</span>
                        </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                            <Star size={16} className="fill-yellow-500 stroke-yellow-500" />
                            {props.movie.rating}
                        </div>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    let paths = [];
    
    try {
        const response = await axios.get(`http://localhost:3000/api/movies`);
        const movies = response.data;
        
        paths = movies.map((movie) => ({
            params: { id: movie.id.toString() },
        }));
    } catch (err) {
        console.error('Fetch error in getStaticPaths:', err);
        paths = [];
    }

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context) {
    let movie = null;
    let director = null;
    
    // Fetch movie data
    try {
        const movieResponse = await axios.get(
            `http://localhost:3000/api/movies/${context.params.id}`
        );
        movie = movieResponse.data;
        
        if (!movie) {
            return { notFound: true };
        }
        
    } catch (movieErr) {
        console.error('Movie fetch error:', movieErr);
        return { notFound: true };
    }
    
    // Fetch director data
    try {
        const directorResponse = await axios.get(
            `http://localhost:3000/api/directors/${movie.directorId}`
        );
        
        if (!directorResponse.data?.director || Object.keys(directorResponse.data.director).length === 0) {
            return { notFound: true };
        }
        
        director = directorResponse.data.director;
    } catch (err) {
        console.error('Director fetch error:', err);
        return { notFound: true };
    }

    return {
        props: {
            movie,
            director,
        },
        revalidate: 60, // Revalidate every minute
    };
}