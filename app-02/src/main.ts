import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Environment } from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(<MicroserviceOptions>{
    transport: Transport.REDIS,
    options: {
      url: Environment.redisUrl,
    },
  });
  app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
