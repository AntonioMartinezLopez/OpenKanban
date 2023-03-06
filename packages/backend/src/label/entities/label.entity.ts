import { ObjectType, Field } from '@nestjs/graphql';
import { Board } from 'src/board/entities/board.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Label Id' })
  id: string;

  @Column('text')
  @Field({ description: 'The name of the label' })
  name: string;

  @Column('text')
  @Field({ description: 'Color of the label' })
  color: string;

  @ManyToOne(() => Board, (board) => board.labels, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @ManyToMany(() => Task, (task) => task.labels, { onDelete: 'CASCADE' })
  tasks: Task[];
}
