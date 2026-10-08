import { Injectable, NotFoundException } from '@nestjs/common';
import { Bicycle } from '../Model/Model_Bicycles.js';

@Injectable()
export class BicyclesService {

    private bicycles: Bicycle[] = [
        { id: "1", type: "montaña", status: "disponible", location: "Sede Norte" },
        { id: "2", type: "ruta", status: "en_uso", location: "Sede Centro" },
        { id: "3", type: "electrica", status: "mantenimiento", location: "Sede Norte" },
        { id: "4", type: "montaña", status: "disponible", location: "Sede Sur" },
    ];

    //Creamos el metodo para listar bicicletas con filtros opcionales
    findAll(filters: { status?: string; type?: string; location?: string } = {}): Bicycle[] {
        const matches = (value: string, filter?: string) =>
            !filter || value.toLowerCase() === filter.toLowerCase();

        return this.bicycles.filter((bike) =>
            matches(bike.status, filters.status) &&
            matches(bike.type, filters.type) &&
            matches(bike.location, filters.location),
        );
    }

    //Creamos el metodo para ver el detalle de una bicicleta
    findOne(id: string): Bicycle {
        const bike = this.bicycles.find((b) => b.id === id);
        if (!bike) throw new NotFoundException(`Bicicleta ${id} no encontrada`);
        return bike;
    }
}
