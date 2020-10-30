import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByNameFirstName(nom : string) {
    return await this.usersRepository.findOne({nom});
  }

   async test(Liste : any){
  
    return  await  Promise.all( Liste.split(',').map(async (idNom) => await this.usersRepository.findOne({idNom})));

  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(user : User){
    return this.usersRepository.save(user);
  }
}