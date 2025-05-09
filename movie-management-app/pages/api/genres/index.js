import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
    );

    const db = client.db();
    const genresCollection = db.collection("genres");
    const genres = await genresCollection.find({}).toArray()

    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 