import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
