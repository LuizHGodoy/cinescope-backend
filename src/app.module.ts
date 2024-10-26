import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
