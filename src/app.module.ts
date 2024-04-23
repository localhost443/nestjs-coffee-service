import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffees/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { appConfig } from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      ignoreEnvFile: false,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_POST: Joi.number().default(3306),
        DATABASE_USERNAME: Joi.required(),
      }),
    }),
    CoffeeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: '',
      database: 'coffeeshop',
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*.js'],
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
