import { 
    Controller,
     Get, 
     Post, 
     Put, 
     Body, 
     Param, 
     Query } from '@nestjs/common';
import { RentalsService } from '../Service/Service_rentals.js';
import { CreateRentalDto } from '../Dto/Dto_Rentals.js';
 
@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) {}
 
    //POST iniciar un alquiler
    @Post()
    create(@Body() dto: CreateRentalDto) {
        return this.rentalsService.create(dto);
    }
 
    //GET listar alquileres (opcionalmente por estado)
    @Get()
    findAll(@Query('status') status?: string) {
        return this.rentalsService.findAll(status);
    }
 
    //GET detalle de un alquiler
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rentalsService.findOne(id);
    }
 
    //PUT finalizar/devolver el alquiler
    @Put(':id/finish')
    finish(@Param('id') id: string) {
        return this.rentalsService.finish(id);
    }
}