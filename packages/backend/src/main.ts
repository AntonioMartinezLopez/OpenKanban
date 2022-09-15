import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger:
    //   process.env.NODE_ENV === 'development'
    //     ? ['log', 'debug', 'error', 'verbose', 'warn']
    //     : ['error', 'warn'],
  });
  app.use(cookieParser());
  await app.listen(process.env.EXPOSE_PORT || 3000);
}
bootstrap();
