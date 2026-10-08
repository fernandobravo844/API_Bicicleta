import {
    Controller,
    Param,
    Query,
    Get,
} from '@nestjs/common';
import { BicyclesService } from '../Service/Service_Bicycles.js';

@Controller("bicycles")
export class BicyclesController {
  constructor(private BicycleService: BicyclesService) {}

  // GET /bicycles?status=disponible&type=ruta&location=Sede Norte
  @Get()
  getAllBicycles(
    @Query("status") status?: string,
    @Query("type") type?: string,
    @Query("location") location?: string,
  ) {
    return this.BicycleService.findAll({ status, type, location });
  }

  // GET /bicycles/:id
  @Get(":id")
  getBicycle(@Param("id") id: string) {
    return this.BicycleService.findOne(id);
  }
}
