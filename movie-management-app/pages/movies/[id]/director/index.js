import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DirectorDetails(props) {
    if (!props.director) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">Director not found</h2>
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
                    {props.directorMovies && props.directorMovies.length > 0 && (
                        <Link href={`/movies/${props.directorMovies[0].id}`}>
                            <span className="text-blue-600 hover:text-blue-800">← Back</span>
                        </Link>
                    )}
                    {(!props.directorMovies || props.directorMovies.length === 0) && (
                        <Link href="/">
                            <span className="text-blue-600 hover:text-blue-800">← Back to Home</span>
                        </Link>
                    )}
                </div>
                
                <Card className="overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 shadow-md mb-8">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-3xl font-bold text-movieHouse">{props.director.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                        <div className="text-gray-700 dark:text-gray-400">
                            <h2 className="text-xl font-semibold mb-2">Biography</h2>
                            <p className="leading-relaxed">{props.director.biography}</p>
                        </div>
                    </CardContent>
                </Card>

                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-400">Movies by {props.director.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {props.directorMovies && props.directorMovies.map((movie) => (
                        <Card key={movie.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-100">
                            <CardHeader className="pb-2">
                                <Link href={`/movies/${movie.id}`} className="text-primary hover:text-blue-800 transition duration-300">
                                    <CardTitle className="text-xl">
                                        {movie.title}
                                    </CardTitle>
                                </Link>
                            </CardHeader>
                            
                            <CardContent className="pb-2">
                                <p className="text-gray-600 mb-4 line-clamp-3 dark:text-gray-400">{movie.description}</p>
                            </CardContent>
                            
                            <CardFooter className="flex justify-between items-center pt-0">
                                <Badge variant="outline" className="text-sm">
                                    Year: {movie.releaseYear}
                                </Badge>
                                {movie.rating && (
                                    <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                                        <Star size={16} className="fill-yellow-500 stroke-yellow-500" />
                                        {movie.rating}
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                    
                    {(!props.directorMovies || props.directorMovies.length === 0) && (
                        <div className="col-span-full text-center py-8 text-gray-600">
                            No movies found for this director.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps(context) {
    let movie = null;
    let director = null;
    let directorMovies = [];
    
    try {
        const movieResponse = await axios.get(
            `http://localhost:3000/api/movies/${context.params.id}`
        );
        movie = movieResponse.data;
        
        if (!movie) {
            return { notFound: true };
        }
    } catch (err) {
        console.error('Movie fetch error:', err);
        return { notFound: true };
    }

    try {
        const directorResponse = await axios.get(
            `http://localhost:3000/api/directors/${movie.directorId}`
        );
        
        if (!directorResponse.data?.director || Object.keys(directorResponse.data.director).length === 0) {
            return { notFound: true };
        }
        
        director = directorResponse.data.director;
        directorMovies = directorResponse.data.movies || [];
    } catch (err) {
        console.error('Director fetch error:', err);
        return { notFound: true };
    }

    return {
        props: {
            director,
            directorMovies,
        },
        revalidate: 60,
    };
}