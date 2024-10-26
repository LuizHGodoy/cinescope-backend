import axios from "axios";
import { parentPort } from "node:worker_threads";
import { PrismaService } from "../prisma/prisma.service";

const prisma = new PrismaService();

async function fetchPopularMovies(apiKey: string, page: number) {
  const baseUrl = process.env.API_URL;

  const response = await axios.get(`${baseUrl}/movie/popular`, {
    params: { api_key: apiKey, page },
  });

  return response.data.results;
}

async function saveMoviesToDatabase(movies: any[]) {
  const movieData = movies.map((movie) => ({
    tmdbId: movie.id,
    adult: movie.adult,
    backdropPath: movie.backdrop_path,
    genreIds: movie.genre_ids,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    posterPath: movie.poster_path,
    releaseDate: new Date(movie.release_date),
    title: movie.title,
    video: movie.video,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  }));

  await prisma.movie.createMany({
    data: movieData,
    skipDuplicates: true,
  });
}

parentPort?.on("message", async (data) => {
  const { apiKey, startPage, endPage } = data;

  for (let page = startPage; page <= endPage; page++) {
    const movies = await fetchPopularMovies(apiKey, page);
    await saveMoviesToDatabase(movies);
    parentPort?.postMessage({ page, success: true });
  }
  parentPort?.postMessage({ success: true, finished: true });
});
