import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [
    OrganizationsModule,
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
