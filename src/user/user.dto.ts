import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';


export class UserDTO {
  prenom: string;

  nom: string;

  email: string;

  role:string;

  constructor(user : User){
      this.prenom = user.prenom;
      this.nom = user.nom;
      this.email = user.email;
      this.role = user.role;
  }
}