import {
    Controller,
    Param,
    Query,
    Get,
    Post,
    Body,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';

import { BicyclesService } from './bicycles.service.js';

@Controller('bicycles')
export class BicyclesController {
    constructor(private BicycleService: BicyclesService) {}

    @Get()
    getAllBicycles(
        @Query('status') status?: string,
        @Query('type') type?: string,
        @Query('location') location?: string,
    ) {
        return this.BicycleService.findAll({ status, type, location });
    }

    @Get(':id')
    getBicycle(@Param('id', ParseUUIDPipe) id: string) {
        return this.BicycleService.findOne(id);
    }

    @Post()
    createBicycle(@Body() body: any) {
        return this.BicycleService.create(body);
    }

    // Eliminar una bicicleta
    @Delete(':id')
      deleteBicycle(@Param('id', ParseUUIDPipe) id: string) {
      return this.BicycleService.delete(id);
  }
}