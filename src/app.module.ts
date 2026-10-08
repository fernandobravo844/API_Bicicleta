import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersController } from './Controllers/Controller_Users.js';
import { UsersService } from './Service/Service_Users.js';
import { BicyclesController } from './Controllers/Controller_Bicycles.js';
import { BicyclesService } from './Service/Service_Bicycles.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'bicicleta',
    }),
  ],
  controllers: [AppController, UsersController, BicyclesController],
  providers: [AppService, UsersService, BicyclesService],
})
export class AppModule {}
