import { Controller, Param, Get, Post, Body, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { createUserDto, UpdateUserDto } from './dto/Dto_Users.js';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() userpayload: createUserDto) {
    return this.usersService.create(userpayload);
  }

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}