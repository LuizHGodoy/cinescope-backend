import { Controller, Delete, Get, Logger, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MoviesService } from "./movies.service";

@ApiTags("movies")
@Controller("movies")
export class MoviesController {
  private readonly logger = new Logger(MoviesController.name);

  constructor(private readonly moviesService: MoviesService) {}

  @Post("reindex")
  @ApiOperation({ summary: "Reindexa os filmes" })
  @ApiResponse({
    status: 200,
    description: "Reindexação concluída com sucesso.",
  })
  async reindex() {
    return this.moviesService.reindexMovies();
  }

  @Delete("clear")
  @ApiOperation({ summary: "Limpa o banco de dados de filmes" })
  @ApiResponse({
    status: 200,
    description: "Banco de dados de filmes limpo com sucesso.",
  })
  async clearDatabase() {
    await this.moviesService.clearMoviesDatabase();
    return { message: "Banco de dados de filmes limpo com sucesso" };
  }

  @Get()
  @ApiOperation({ summary: "Obtém a lista de filmes" })
  @ApiResponse({
    status: 200,
    description: "Lista de filmes retornada com sucesso.",
  })
  async getMovies(@Query("page") page = "1", @Query("limit") limit = "10") {
    const pageNumber = Number.parseInt(page, 10);
    const limitNumber = Number.parseInt(limit, 10);

    return await this.moviesService.getIndexedMovies(pageNumber, limitNumber);
  }
}
