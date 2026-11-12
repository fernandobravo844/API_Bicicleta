import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { createUserDto, UpdateUserDto } from './dto/Dto_Users.js';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) {}

    // Datos iniciales: solo si la tabla está vacía
    async onModuleInit() {
        if ((await this.usersRepo.count()) > 0) return;
        await this.usersRepo.save([
            { name: 'Juanita', lastname: 'Perez', email: 'juanita@correo.com' },
            { name: 'Carlos', lastname: 'Lopz', email: 'carlos@correo.com' },
        ]);
    }

    // Buscar usuarios
    findAll(): Promise<User[]> {
        return this.usersRepo.find();
    }

    // Crear un usuario nuevo
    async create(userpayload: createUserDto) {
        if (await this.usersRepo.existsBy({ email: userpayload.email })) {
            throw new ConflictException('El correo ya está registrado');
        }
        const newuser = await this.usersRepo.save(this.usersRepo.create(userpayload));
        return { message: 'Usuario guardado con éxito', user: newuser };
    }

    // Editar usuarios
    async update(id: string, changes: UpdateUserDto) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
        const updated = await this.usersRepo.save({ ...user, ...changes });
        return { msg: 'Usuario actualizado', data: updated };
    }

    // Eliminar usuarios
    async remove(id: string) {
        const result = await this.usersRepo.delete(id);
        if (!result.affected) throw new NotFoundException(`Usuario ${id} no encontrado`);
        return { message: 'Usuario eliminado con éxito' };
    }
}