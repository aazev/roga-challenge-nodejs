import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const documentation_config = new DocumentBuilder()
    .setTitle('RogaLabs Code Challenge API')
    .setDescription('API for RogaLabs Code Challenge')
    .setVersion('1.0')
    .addTag('RogaLabs')
    .build();
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const origins = process.env.CORS_ORIGINS.split(',');

  app.enableCors({
    origin: origins,
    methods: 'GET,POST,DELETE',
    credentials: true,
  });

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, documentation_config),
  );

  await app.listen(port, () => {
    console.log(`[WEB] Listening on ${config.get<string>('BASE_URL')}:${port}`);
  });
}

bootstrap();
