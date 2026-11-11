import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from './entities/bicycle.entity.js';
import { BicyclesController } from './bicycles.controller.js';
import { BicyclesService } from './bicycles.service.js';
@Module({
  imports: [TypeOrmModule.forFeature([Bicycle])],
  controllers: [BicyclesController],
  providers: [BicyclesService],
})
export class BicyclesModule {}