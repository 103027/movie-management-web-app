import path from 'path';
import fs from 'fs';

export function getData() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return data;
}

export function getMovies() {
  const data = getData();
  return data.movies;
}

export function getMovie(id) {
  const movies = getMovies();
  return movies.find(movie => movie.id === id);
}

export function getGenres() {
  const data = getData();
  return data.genres;
}

export function getDirectors() {
  const data = getData();
  return data.directors;
}

export function getDirector(id) {
  const directors = getDirectors();
  return directors.find(director => director.id === id);
}

export function getMoviesByGenre(genreId) {
  const movies = getMovies();
  return movies.filter(movie => movie.genreId === genreId);
}

export function getMoviesByDirector(directorId) {
  const movies = getMovies();
  return movies.filter(movie => movie.directorId === directorId);
} 