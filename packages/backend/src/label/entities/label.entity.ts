import { ObjectType, Field } from '@nestjs/graphql';
import { Board } from 'src/board/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    cascade: ['insert'],
  })
  board: Board;
}
