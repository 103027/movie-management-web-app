import { getDirectors, getMoviesByDirector } from '../../utils/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const directors = getDirectors();
    const directorsWithMovies = directors.map(director => ({
      ...director,
      movies: getMoviesByDirector(director.id),
    }));

    res.status(200).json(directorsWithMovies);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 