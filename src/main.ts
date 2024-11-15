import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* app.use(cookieSession({
    keys: ['saeedsufi']
  })) */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )
  await app.listen(3000);
}
bootstrap();

const acceptsObj = (obj: { foo: string; bar: number; baz: boolean }) => {};

acceptsObj;
 
