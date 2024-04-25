import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const option = new DocumentBuilder()
    .setTitle('ILoveCoffee')
    .setDescription('A simple coffee Application')
    .setVersion('1.1')
    .build();
  const doc = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, doc);
  // app.useGlobalInterceptors(new WrapResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
