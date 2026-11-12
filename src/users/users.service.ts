import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // Datos iniciales: solo se insertan si la tabla está vacía
  async onModuleInit() {
    if ((await this.usersRepo.count()) > 0) return;
    await this.usersRepo.save([
      { name: 'Juanita', lastname: 'Perez', email: 'juanita@correo.com' },
      { name: 'Carlos', lastname: 'Lopez', email: 'carlos@correo.com' },
    ]);
  }

  // Listar todos los usuarios
  findAll(): Promise<User[]> {
    return this.usersRepo.find({ order: { createdAt: 'ASC' } });
  }

  // Ver el detalle de un usuario
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }

  // Crear un usuario nuevo (el email debe ser único)
  async create(dto: CreateUserDto) {
    const email = dto.email.toLowerCase();
    await this.ensureEmailAvailable(email);
    const user = await this.usersRepo.save(this.usersRepo.create({ ...dto, email }));
    return { message: 'Usuario creado con éxito', data: user };
  }

  // Editar un usuario (acepta cambios parciales)
  async update(id: string, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (changes.email) {
      changes.email = changes.email.toLowerCase();
      if (changes.email !== user.email) await this.ensureEmailAvailable(changes.email);
    }
    const updated = await this.usersRepo.save(this.usersRepo.merge(user, changes));
    return { message: 'Usuario actualizado con éxito', data: updated };
  }

  // Eliminar un usuario
  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepo.remove(user);
    return { message: 'Usuario eliminado con éxito', data: { ...user, id } };
  }

  private async ensureEmailAvailable(email: string) {
    if (await this.usersRepo.existsBy({ email })) {
      throw new ConflictException(`Ya existe un usuario con el email ${email}`);
    }
  }
}
