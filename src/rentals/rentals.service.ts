import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental, RENTAL_STATUSES, RentalStatus } from './entities/rental.entity.js';
import { User } from '../users/entities/user.entity.js';
import { Bicycle } from '../bicycles/entities/bicycle.entity.js';
import { CreateRentalDto } from './dto/Dto_Rentals.js';

@Injectable()
export class RentalsService {
    constructor(
        @InjectRepository(Rental) private readonly rentalsRepo: Repository<Rental>,
        @InjectRepository(User) private readonly usersRepo: Repository<User>,
        @InjectRepository(Bicycle) private readonly bicyclesRepo: Repository<Bicycle>,
    ) {}

    // Iniciar un alquiler usando el DTO
    async create(dto: CreateRentalDto): Promise<Rental> {
        if (!(await this.usersRepo.existsBy({ id: dto.userId }))) {
            throw new NotFoundException(`Usuario ${dto.userId} no encontrado`);
        }
        if (!(await this.bicyclesRepo.existsBy({ id: dto.bikeId }))) {
            throw new NotFoundException(`Bicicleta ${dto.bikeId} no encontrada`);
        }
        const rental = this.rentalsRepo.create({
            userId: dto.userId,
            bikeId: dto.bikeId,
            startTime: new Date(),
            status: 'activo',
        });
        return this.rentalsRepo.save(rental);
    }

    // Listar alquileres (opcionalmente por estado)
    async findAll(status?: string): Promise<Rental[]> {
        if (status && !RENTAL_STATUSES.includes(status as RentalStatus)) {
            throw new BadRequestException(`Estado inválido: ${status}`);
        }
        return this.rentalsRepo.find({ where: status ? { status: status as RentalStatus } : {} });
    }

    // Detalle de un alquiler
    async findOne(id: string): Promise<Rental> {
        const rental = await this.rentalsRepo.findOneBy({ id });
        if (!rental) throw new NotFoundException(`Alquiler ${id} no encontrado`);
        return rental;
    }

    // Finalizar un alquiler
    async finish(id: string): Promise<Rental> {
        const rental = await this.findOne(id);
        if (rental.status === 'finalizado') {
            throw new BadRequestException('El alquiler ya fue finalizado');
        }
        const endTime = new Date();
        const minutes = Math.ceil((endTime.getTime() - rental.startTime.getTime()) / 60000);
        rental.endTime = endTime;
        rental.totalCost = minutes * 100;
        rental.status = 'finalizado';
        return this.rentalsRepo.save(rental);
    }
}