import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://192.168.137.161:5002', 'http://localhost:5002'],
    credentials: true,
  });
  await app.listen(5001);
}
bootstrap();
