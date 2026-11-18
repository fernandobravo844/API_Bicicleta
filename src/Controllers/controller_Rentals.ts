import { 
    Controller,
     Get, 
     Post, 
     Put, 
     Body, 
     Param, 
     Query } from '@nestjs/common';
import { RentalsService } from '../Service/Service_rentals.js';
import { CreateRentalDto } from '../rentals/dto/Dto_Rentals.js';
 
@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) {}
 
    @Post()
    create(@Body() dto: CreateRentalDto) {
        return this.rentalsService.create(dto);
    }
 
    @Get()
    findAll(@Query('status') status?: string) {
        return this.rentalsService.findAll(status);
    }
 
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rentalsService.findOne(id);
    }
 
    @Put(':id/finish')
    finish(@Param('id') id: string) {
        return this.rentalsService.finish(id);
    }
}