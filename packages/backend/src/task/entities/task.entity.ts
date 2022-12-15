import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Board } from 'src/board/entities/board.entity';
import { Boardcolumn } from 'src/boardcolumn/entities/boardcolumn.entity';
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

  @Column('text', { unique: true })
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

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => Boardcolumn, (board) => board.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: ['insert'],
  })
  boardColumn: Boardcolumn;

  @ManyToMany(() => User, (user) => user.tasks, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  assignees: User[];
}
