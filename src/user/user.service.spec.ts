import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  let usersRepository: Repository<User>;

  beforeEach(() => {
    usersRepository = new Repository();
    userService = new UserService(usersRepository);
  });


  it('should return a list of users', async () => {
    // given 
    const users = "oussama.b,achraf.H"
    const expectedUsers = [
      {
        nom:"b",
        prenom: "oussama",
        id:"0",
        email:"salut@oui.fr",
        password:"test312",
        role:"boss du projet"
      },
      {
        nom:"H",
        prenom: "achraf",
        id:"1",
        email:"salut@oui.fr",
        password:"test312",
        role:"sous fifre" 
      }
    ]
    jest.spyOn(usersRepository, 'findOne').mockImplementation(() => Promise.resolve(expectedUsers));

    // when
      
    const result = await userService.findUserQuery(users)
    // then
    expect(result).toBe(expectedUsers);
  });
});
