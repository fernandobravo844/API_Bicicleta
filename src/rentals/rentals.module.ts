import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity.js';
import { User } from '../users/entities/user.entity.js';
import { Bicycle } from '../bicycles/entities/bicycle.entity.js';
import { RentalsController } from './rentals.controller.js';
import { RentalsService } from './rentals.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, User, Bicycle])],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}