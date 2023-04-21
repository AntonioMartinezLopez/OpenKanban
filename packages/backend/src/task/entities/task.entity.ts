import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Boardcolumn } from 'src/boardcolumn/entities/boardcolumn.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Label } from 'src/label/entities/label.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Task Id' })
  id: string;

  @Column('text')
  @Field({ description: 'The name of the task' })
  name: string;

  @Column('text')
  @Field({ description: 'Description of the task' })
  description: string;

  @Column('numeric', { default: 0 })
  @Field(() => Int, { description: 'Calculated weight of a task' })
  weight: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => Group, (group) => group.tasks, { onDelete: 'CASCADE' })
  group: Group;

  @ManyToOne(() => Boardcolumn, (board) => board.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: ['insert'],
  })
  boardColumn: Boardcolumn;

  @ManyToMany(() => Label, (label) => label.tasks, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'remove'],
  })
  @JoinTable()
  labels: Label[];

  @ManyToMany(() => User, (user) => user.tasks, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  assignees: User[];
}
