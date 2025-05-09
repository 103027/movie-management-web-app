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
        const directorsCollection = db.collection("directors");
        const moviesCollection = db.collection("movies");
        const director = await directorsCollection.findOne({
            id: id
        });
        const movies = await moviesCollection.find({
            directorId: id
        }).toArray()

        const directorsWithMovies = {
            director,
            movies,
        };

        res.status(200).json(directorsWithMovies);
    } catch (error) {
        console.error('Error fetching directors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 