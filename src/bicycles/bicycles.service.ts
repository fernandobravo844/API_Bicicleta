import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bicycle } from './entities/bicycle.entity.js';

@Injectable()
export class BicyclesService implements OnModuleInit {
    constructor(
        @InjectRepository(Bicycle)
        private readonly bicyclesRepo: Repository<Bicycle>,
    ) {}

    async onModuleInit() {
        if ((await this.bicyclesRepo.count()) > 0) return;
        await this.bicyclesRepo.save([
            { type: 'montaña', status: 'disponible', location: 'Sede Norte' },
            { type: 'ruta', status: 'en_uso', location: 'Sede Centro' },
            { type: 'electrica', status: 'mantenimiento', location: 'Sede Norte' },
            { type: 'montaña', status: 'disponible', location: 'Sede Sur' },
        ]);
    }

    async findAll(filters: { status?: string; type?: string; location?: string } = {}): Promise<Bicycle[]> {
        const qb = this.bicyclesRepo.createQueryBuilder('bike');
        if (filters.status) {
            qb.andWhere('bike.status::text = :status', { status: filters.status.toLowerCase() });
        }
        if (filters.type) {
            qb.andWhere('LOWER(bike.type) = LOWER(:type)', { type: filters.type });
        }
        if (filters.location) {
            qb.andWhere('LOWER(bike.location) = LOWER(:location)', { location: filters.location });
        }
        return qb.getMany();
    }

    async findOne(id: string): Promise<Bicycle> {
        const bike = await this.bicyclesRepo.findOneBy({ id });
        if (!bike) throw new NotFoundException(`Bicicleta ${id} no encontrada`);
        return bike;
    }

    async create(data: Partial<Bicycle>): Promise<Bicycle> {
         const bicycle = this.bicyclesRepo.create(data);
        return this.bicyclesRepo.save(bicycle);
    }

    async delete(id: string) {
        const bike = await this.findOne(id);
        await this.bicyclesRepo.remove(bike);
        return {
            message: 'Bicicleta eliminada correctamente',
            data: bike,
        };
    }
}