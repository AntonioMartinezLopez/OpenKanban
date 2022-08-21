import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
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

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
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
