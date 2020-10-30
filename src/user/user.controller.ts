import { Controller, Get, Query, HttpStatus, Post, Body, Delete, Param  } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(readonly userService:UserService){}

    @Get()
    async findAll() {
      const result = await this.userService.findAll();
      const response = result.map((value:User)=>new UserDTO(value));
        return {
            statusCode: HttpStatus.OK,
            data:  response
          };
    }

    @Get("/ListUser")
    async findUserQuery(@Query() query) {
       const result =  await this.userService.findUserQuery(query.identifiants) ;
       const response = result.map((value:User)=>new UserDTO(value));
        return {
            statusCode: HttpStatus.OK,
            data:  response
          };
     
    }
   @Post('/addUser')
    async insert(@Body() rdvDto:User):Promise<UserDTO>{
        let user = null;
        const insert: any = await this.userService.createUser(rdvDto)
        .then(value => user = value)
        .catch(err =>console.log(err));

        
            return new UserDTO(user);
        
   }

   @Delete("/removeUser/:id")
   async delete(@Param("id") id: string){
    await this.userService.remove(id);
   }
}
