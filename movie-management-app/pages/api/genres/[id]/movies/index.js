import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { id } = req.query
        const client = await MongoClient.connect(
            process.env.MONGODB_URI
        );

        const db = client.db();
        const genresCollection = db.collection("genres");
        const moviesCollection = db.collection("movies");
        const genre = await genresCollection.findOne({
            id: id
        });
        const movies = await moviesCollection.find({
            genreId: id
        }).toArray()
        
        const MoviesByGenre = {
            genre,
            movies,
        };

        res.status(200).json(MoviesByGenre);
    } catch (error) {
        console.error('Error fetching genre:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 