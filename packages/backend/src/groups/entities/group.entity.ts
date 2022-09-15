import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Group Id' })
  id: string;

  @Column('text')
  @Field({ description: 'The name of the group' })
  name: string;

  @Column('text')
  @Field({ description: 'Description of the group' })
  description: string;

  @ManyToMany(() => User, (user) => user.groups, {
    cascade: ['insert'],
  })
  @JoinTable()
  users: User[];
}
