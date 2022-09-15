import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'UserId' })
  userId: string;

  @Column('text')
  @Field({ description: 'The name of the user' })
  username: string;

  @Column('text')
  @Field({ description: 'The email of the user' })
  email: string;

  @Column('text')
  password: string;

  @Column('simple-array')
  refreshToken?: string[];
}
