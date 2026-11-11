import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { UsersController } from './Controllers/Controller_Users.js';
import { UsersService } from './Service/Service_Users.js';

import { BicyclesModule } from './bicycles/bicycles.module.js';

import { RentalsController } from './Controllers/controller_Rentals.js';
import { RentalsService } from './Service/Service_rentals.js';


import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';



export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    BicyclesModule,
  ],
  controllers: [AppController, UsersController, RentalsController],
  providers: [AppService, UsersService, RentalsService],
})
export class AppModule {}
