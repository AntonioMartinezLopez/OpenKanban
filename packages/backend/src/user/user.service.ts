import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput, UpdateUserInputAuth } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // C for CREATE
  async create(createUserInput: CreateUserInput): Promise<User> {
    // check whether user already exists with given name. If so, abort creation of user
    const existingUser = await this.usersRepository.findOneBy({
      username: createUserInput.username,
    });
    if (existingUser) throw new ForbiddenException('Username already exists!');

    try {
      //Create User Object
      const newUser = new User();
      newUser.username = createUserInput.username;
      newUser.email = createUserInput.email;
      newUser.refreshToken = [];

      // hash and set password
      newUser.password = await bcrypt.hash(createUserInput.password, 10);

      //Save new user and return
      return this.usersRepository.save(newUser);
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  // R for READ
  async findAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ userId: id });
  }

  async findOneByName(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username: username });
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where(":refreshToken = ANY ( string_to_array(user.refreshToken, ','))", {
        refreshToken: refreshToken,
      })
      .getOne();
    // .where(":refreshToken = ANY ( string_to_array(user.refreshToken, ','))", { refreshToken: refreshToken })
  }

  // U for UPDATE
  async update(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      //hash password
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        10,
      );

      await this.usersRepository.update(
        { userId: updateUserInput.userId },
        { ...updateUserInput },
      );

      return this.usersRepository.findOneBy({ userId: updateUserInput.userId });
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  // internal function
  async updateTokens(updateUserInput: UpdateUserInputAuth): Promise<User> {
    await this.usersRepository.update(
      { userId: updateUserInput.userId },
      { ...updateUserInput },
    );

    return this.usersRepository.findOneBy({ userId: updateUserInput.userId });
  }

  // D for DELETE
  async remove(id: string): Promise<User> {
    const user = await this.findOneById(id);
    if (user) {
      this.usersRepository.remove(user);
    }
    throw new ForbiddenException('User id is unknown!');
  }
}
