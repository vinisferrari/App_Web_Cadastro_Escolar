import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:  '*',
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, accept'
  });
  await app.listen(3000);
}
bootstrap();
