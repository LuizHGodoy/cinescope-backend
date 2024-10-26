import { Controller, Delete, Get, Logger, Post, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  private readonly logger = new Logger(MoviesController.name);

  constructor(private readonly moviesService: MoviesService) {}

  @Post("reindex")
  async reindex() {
    return this.moviesService.reindexMovies();
  }

  @Delete("clear")
  async clearDatabase() {
    await this.moviesService.clearMoviesDatabase();
    return { message: "Banco de dados de filmes limpo com sucesso" };
  }

  @Get()
  async getMovies(@Query("page") page = "1", @Query("limit") limit = "10") {
    const pageNumber = Number.parseInt(page, 10);
    const limitNumber = Number.parseInt(limit, 10);

    return await this.moviesService.getIndexedMovies(pageNumber, limitNumber);
  }
}
