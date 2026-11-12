import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Listar usuarios
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  // Ver el detalle de un usuario
  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  // Crear un usuario
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // Editar un usuario (acepta cambios parciales)
  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  @Patch(':id')
  patchUser(@Param('id', ParseUUIDPipe) id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  // Eliminar un usuario
  @Delete(':id')
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
