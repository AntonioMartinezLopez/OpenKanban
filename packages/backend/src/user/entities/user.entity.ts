import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from 'src/auth/roles/role.enum';
import { Group } from 'src/groups/entities/group.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @Field({ description: 'First name of the user' })
  firstName: string;

  @Column('text')
  @Field({ description: 'Last name of the user' })
  lastName: string;

  @Column('text')
  @Field({ description: 'The email of the user' })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column('simple-array')
  refreshToken?: string[];

  @ManyToMany(() => Group, (group) => group.users, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  groups: Group[];

  @ManyToMany(() => Task, (task) => task.assignees, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
