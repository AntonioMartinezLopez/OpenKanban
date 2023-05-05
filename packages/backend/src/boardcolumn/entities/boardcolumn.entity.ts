import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Board } from 'src/board/entities/board.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Boardcolumn {
  constructor(columnName: string, canBedeleted: boolean) {
    this.name = columnName;
    this.canBeDeleted = canBedeleted;
  }

  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Column Id' })
  id: string;

  @Column('text')
  @Field({ description: 'The name of the Column' })
  name: string;

  @Column('boolean')
  @Field({
    description: 'Flag describing whether a column can be deleted or not',
  })
  canBeDeleted: boolean;

  @Column('numeric', { nullable: true })
  @Field(() => Int, { description: 'Maximum weight the column can hold' })
  maxWeight: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => Task, (task) => task.boardColumn)
  tasks: Task[];
}
