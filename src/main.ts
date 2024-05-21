import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Configs } from './config/config';
import { GlobalResponseInterceptor } from './common/response.interceptor';
import { GlobalExceptionFilter } from './errors/custom.errors';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(Configs().context);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('OTT Platform')
    .setDescription('OTT Platform Service to stream movie and TV Shows')
    .setVersion('v1')
    .addTag('ott')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ott-platform/api', app, document);
  app.use(helmet());
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(compression());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Configs().port, '0.0.0.0');
}
bootstrap();
