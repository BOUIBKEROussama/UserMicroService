import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';


export class UserDTO {
	@ApiProperty({ example: 'Oussama', description: 'prenom de l\'utilisateur' })
	prenom: string;

	@ApiProperty({ example: 'Boubaiker', description: 'nom de l\'utilisateur' })
	nom: string;

	@ApiProperty({ example: 'OussamaB@gmail.com', description: 'adresse mail de l\'utilisateur' })
	email: string;

	@ApiProperty({ example: 'admin', description: 'role de l\'utilisateur' })
	role: string;

	constructor(user: User) {
		this.prenom = user.prenom;
		this.nom = user.nom;
		this.email = user.email;
		this.role = user.role;
	}
}
