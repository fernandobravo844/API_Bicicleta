import { Injectable, NotFoundException } from '@nestjs/common';
import{ Rental } from '../Model/Model_rentals.js';

 
@Injectable()
export class RentalsService {
 
    private rentals: Rental[] = [
        { id: "1", userId: "1", bikeId: "3", startTime: "2026-10-17T08:00:00", endTime: "2026-10-17T08:45:00", 
            totalCost: 4500, status: "finalizado" },
        { id: "2", userId: "2", bikeId: "2", startTime: "2026-10-17T09:30:00", status: "activo" },
    ];
 
    //Creamos el metodo para iniciar un alquiler
    create(userId: string, bikeId: string): Rental {
        const rental: Rental = {
            id: String(this.rentals.length + 1),
            userId,
            bikeId,
            startTime: new Date().toISOString(),
            status: "activo",
        };
        this.rentals.push(rental);
        return rental;
    }
 
    //Creamos el metodo para listar alquileres (opcionalmente solo los activos)
    findAll(status?: string): Rental[] {
        return this.rentals.filter((r) => !status || r.status === status);
    }
 
    //Creamos el metodo para ver el detalle de un alquiler
    findOne(id: string): Rental {
        const rental = this.rentals.find((r) => r.id === id);
        if (!rental) throw new NotFoundException(`Alquiler ${id} no encontrado`);
        return rental;
    }
 
    //Creamos el metodo para finalizar un alquiler
    finish(id: string): Rental {
        const rental = this.findOne(id);
        const minutes = Math.ceil(
            (Date.now() - new Date(rental.startTime).getTime()) / 60000,
        );
        rental.endTime = new Date().toISOString();
        rental.totalCost = minutes * 100;
        rental.status = "finalizado";
        return rental;
    }
}
 