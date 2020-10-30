import { Controller, Get, Query, HttpStatus, Post, Body  } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(readonly userService:UserService){}

    @Get()
    findAll(@Query() query): any {
        console.log(query.identifiant);
      return this.userService.findByNameFirstName("wan");
    }

    @Get("/ListUser")
    async findTest(@Query() query) {
       const s =  await this.userService.test(query.identifiants) ;
       const res = s.map((value:User)=>new UserDTO(value));
        return {
            statusCode: HttpStatus.OK,
            data:  res
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
}
