import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../Model/Model_Users.js';
import { createUserDto, UpdateUserDto } from '../Dto/Dto_Users.js';

@Injectable()
export class UsersService {

    private users: User[] = [
        {
          id: "1",
          name: "Juanita",
          lastname:"Perez",
          email: "juanita@correo.com",
        },
        {
          id: "2",
          name: "Carlos",
          lastname:"Lopz",
          email: "carlos@correo.com",
        },
      ];

      //Creamos el metodo para buscar usuarios
      findAll():User[]{
        return this.users.filter((user)=> user);
      }

      //Creamos el metodo para crear un usuario nuevo
     create(userpayload: createUserDto) {
        const newuser = {
        ...userpayload,
        id: String(new Date().getTime()),
        };
        this.users.push(newuser);
        return { message: 'Usuario guardado con éxito', user: newuser };
    }

        //Creamos el metodo para editar usuarios
        update(id:string, changes:UpdateUserDto){
        const position = this.users.findIndex((user) => user.id === id);
        if(position === -1) {
            return {
                msg: 'El usuario no existe'
            }
        } 
        const currentData = this.users[position];
        const updateUser = {
            ...currentData,
            ...changes,
        };
    
        this.users[position] = updateUser;

        return {
        msg: "Usuario actualizado",
        data: updateUser
        }
    }

    
    //Creamos el metodo para eliminar Usuarios
    remove(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`Usuario ${id} no encontrado`);
    this.users.splice(index, 1);
    return { message: 'Usuario eliminado con éxito' };
}


}
