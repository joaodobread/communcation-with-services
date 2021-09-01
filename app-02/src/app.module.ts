import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      entities: [`${__dirname}/**/*.entity.{js,ts}`],
      logging: 'all',
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
