import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Use global pipes for validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Set Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger docs available at: http://localhost:3000/api/docs`);
}

bootstrap();
