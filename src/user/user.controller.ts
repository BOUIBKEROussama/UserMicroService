import { Controller, Get, Query, HttpStatus, Post, Body } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiResponse, ApiQuery, ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

	constructor(readonly userService: UserService) { }



	@ApiResponse({
		status: 200,
		type: [UserDTO],
		description: 'Retourne les données de tous les utilisateurs'
	})
	@Get()
	findAll(): any {
		return this.userService.findAll();
	}



	@ApiResponse({
		status: 200,
		type: UserDTO,
		description: 'Retourne les données de tous les utilisateurs passés en paramètres dans l\'url au format "prenom.nom"'
	})
	@ApiQuery({ name: 'identifiant' })
	@Get("/ListUser")
	async findTest(@Query() query) {
		const s = await this.userService.findUserQuery(query.identifiants);
		const res = s.map((value: User) => new UserDTO(value));
		return {
			statusCode: HttpStatus.OK,
			data: res
		};

	}


	@ApiResponse({ status: 200, description: 'Création d\'un utilisateur' })
	@ApiOperation({ summary: 'Create User' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiBody({ type: UserDTO })
	@Post('/addUser')
	async insert(@Body() rdvDto: User): Promise<UserDTO> {
		let user = null;
		const insert: any = await this.userService.createUser(rdvDto)
			.then(value => user = value)
			.catch(err => console.log(err));


		return new UserDTO(user);

	}
}
