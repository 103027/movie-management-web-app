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
    const directorsCollection = db.collection("directors");
    const directors = await directorsCollection.find({}).toArray()

    res.status(200).json(directors);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 