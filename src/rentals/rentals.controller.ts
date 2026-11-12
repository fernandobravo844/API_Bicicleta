import { Controller, Get, Post, Put, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { CreateRentalDto } from './dto/Dto_Rentals.js';

@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) {}

    // POST iniciar un alquiler
    @Post()
    create(@Body() dto: CreateRentalDto) {
        return this.rentalsService.create(dto);
    }

    // GET listar alquileres (opcionalmente por estado)
    @Get()
    findAll(@Query('status') status?: string) {
        return this.rentalsService.findAll(status);
    }

    // GET detalle de un alquiler
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.rentalsService.findOne(id);
    }

    // PUT finalizar/devolver el alquiler
    @Put(':id/finish')
    finish(@Param('id', ParseUUIDPipe) id: string) {
        return this.rentalsService.finish(id);
    }
}