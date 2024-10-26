import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("cinescope")
    .setDescription("API for cinescope")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 3434);
}
bootstrap();
