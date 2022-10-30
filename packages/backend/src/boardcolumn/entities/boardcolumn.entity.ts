import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Board } from 'src/board/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Boardcolumn {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Column Id' })
  id: string;

  @Column('text', { unique: true })
  @Field({ description: 'The name of the Column' })
  name: string;

  @Column('numeric', { nullable: true })
  @Field(() => Int, { description: 'Maximum weight the column can hold' })
  maxWeight: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;
}
