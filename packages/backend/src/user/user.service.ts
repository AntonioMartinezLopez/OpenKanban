import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private users: Array<User> = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      email: '',
      refreshToken: [],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      email: '',
      refreshToken: [],
    },
  ];

  async create(createUserInput: CreateUserInput): Promise<User> {
    //Create User Object
    const newUser = new User();
    newUser.username = createUserInput.username;
    newUser.password = createUserInput.password;
    newUser.email = createUserInput.email;

    //Save new User
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  findAll() {
    return this.users;
  }

  findOneById(id: number) {
    return this.users.find((user) => user.userId === id);
  }

  findOneByName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserInput: Record<any, any>): User | undefined {
    let updatedUser;
    this.users = this.users.map((user) => {
      if (user.userId === id) {
        updatedUser = { ...user, ...updateUserInput };
        return { ...user, ...updateUserInput };
      } else {
        return user;
      }
    });
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
