import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']); // Reemplaza '*' con los orígenes permitidos
    res.append(
      'Access-Control-Allow-Methods',
      ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    );
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  

  // Resto de la configuración de tu aplicación

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
