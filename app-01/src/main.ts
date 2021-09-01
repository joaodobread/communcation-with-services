import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(<MicroserviceOptions>{
    transport: Transport.REDIS,
    options: {
      url: 'redis://:password@localhost:6379',
    },
  });
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
