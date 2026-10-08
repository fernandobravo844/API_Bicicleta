import { 
    Controller,
    Param,
    Get, 
    Post,
    Body,
    Put,
    Delete

} from '@nestjs/common';
import{UsersService} from '../Service/Service_Users.js';
import { createUserDto, UpdateUserDto } from '../Dto/Dto_Users.js';



@Controller("users")
export class UsersController {
  constructor(private UserServicie: UsersService) {

  }

@Get("")
getAllUsers() {
 return this.UserServicie.findAll();
}
@Post()
createUser(@Body() userpayload: createUserDto) {
  return this.UserServicie.create(userpayload);
}
@Put(":id")
updateUser(@Param("id") id: string, @Body() changes:UpdateUserDto) {
return this.UserServicie.update(id, changes);
}

@Delete(":id")
remove(@Param("id") id: string) {
return this.UserServicie.remove(id);
}


}
