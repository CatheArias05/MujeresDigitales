import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/loggerGlobal';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.use(loggerGlobal);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3002);
  console.log(`Servidor corriendo en el puerto 3002`);
}
bootstrap();
