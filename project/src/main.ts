import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Curriculum Vitae API')
    .setDescription('API for my Curriculum Vitae demo WebApp')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Ignore any properties that are not in the DTO
    forbidNonWhitelisted: true, // Throw an error if a property is not in the DTO
    transform: true, // Enable transformation ()
  }));
  await app.listen(3000);
}
bootstrap();
