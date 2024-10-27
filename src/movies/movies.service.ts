import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { firstValueFrom } from "rxjs";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MoviesService {
  private readonly apiKey = process.env.API_KEY;
  private readonly baseUrl = process.env.API_URL;
  private readonly logger = new Logger(MoviesService.name);

  private rateLimiter = new RateLimiterMemory({
    points: 40,
    duration: 1,
  });

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async updateLastIndexedPage(page: number): Promise<void> {
    await this.prisma.indexingStatus.update({
      where: { id: 1 },
      data: { lastIndexedPage: page },
    });
  }

  async getIndexedMovies(page: number, limit: number) {
    const movies = await this.prisma.movie.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const existingIndexStatus = await this.prisma.indexingStatus.findFirst();
    const totalMovies = await this.prisma.movie.count();
    const totalPages = Math.ceil(totalMovies / limit);

    return {
      data: movies,
      page,
      totalPages,
      lastIndexedPage: existingIndexStatus?.lastIndexedPage || 1,
    };
  }

  async fetchPopularMoviesBatch(startPage: number, pagesCount = 3) {
    const requests = Array.from({ length: pagesCount }, (_, i) =>
      this.fetchPopularMovies(startPage + i),
    );

    const responses = await Promise.all(requests);
    return responses.flatMap((response) => response?.results || []);
  }

  async fetchPopularMovies(page: number) {
    try {
      await this.rateLimiter.consume("moviesAPI");

      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/popular`, {
          params: { api_key: this.apiKey, page },
          timeout: 10000,
        }),
      );

      return response.data;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return this.fetchPopularMovies(page);
    }
  }

  async saveMoviesToDatabase(movies: any[]) {
    const movieData = movies
      .filter((movie) => {
        return (
          movie.release_date &&
          !Number.isNaN(new Date(movie.release_date).getTime())
        );
      })
      .map((movie) => {
        const releaseDate = new Date(movie.release_date);

        return {
          tmdbId: movie.id,
          adult: movie.adult,
          backdropPath: movie.backdrop_path,
          genreIds: movie.genre_ids,
          originalLanguage: movie.original_language,
          originalTitle: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          posterPath: movie.poster_path,
          releaseDate: releaseDate,
          title: movie.title,
          video: movie.video,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        };
      });

    await this.prisma.movie.createMany({
      data: movieData,
      skipDuplicates: true,
    });
  }

  async clearMoviesDatabase() {
    await this.prisma.movie.deleteMany();
    await this.prisma.indexingStatus.deleteMany();
    this.logger.log(
      "Todos os filmes e o status de indexação foram removidos do banco de dados.",
    );
  }

  async reindexMovies() {
    const existingIndexStatus = await this.prisma.indexingStatus.findFirst();
    let currentPage = existingIndexStatus?.lastIndexedPage || 1;

    if (!existingIndexStatus) {
      const newIndexStatus = await this.prisma.indexingStatus.create({
        data: {
          lastIndexedPage: 1,
        },
      });

      currentPage = newIndexStatus.lastIndexedPage;
    }

    const targetPages = 10;
    let pagesFetched = 0;

    while (pagesFetched < targetPages) {
      const movies = await this.fetchPopularMoviesBatch(currentPage, 3);

      if (movies.length > 0) {
        await this.saveMoviesToDatabase(movies);
        pagesFetched += 3;
        currentPage += 3;
        await this.updateLastIndexedPage(currentPage);
      } else {
        break;
      }
    }

    this.logger.log("Batch de reindexação concluído.");
  }
}
