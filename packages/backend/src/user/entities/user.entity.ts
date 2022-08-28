import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int, { description: 'UserId' })
  userId: number;

  @Column('text')
  @Field({ description: 'The name of the user' })
  username: string;

  @Column('text')
  @Field({ description: 'The email of the user' })
  email: string;

  @Column('text')
  password: string;

  @Column('simple-array', { default: [] })
  refreshToken?: Array<string>;
}
