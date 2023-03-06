import { ObjectType, Field } from '@nestjs/graphql';
import { Boardcolumn } from 'src/boardcolumn/entities/boardcolumn.entity';
import { Label } from 'src/label/entities/label.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Board id' })
  id: string;

  @Column('text')
  @Field({ description: 'The name of the board' })
  name: string;

  @Column('text')
  @Field({ description: 'The desciription of the user' })
  description: string;

  @OneToMany(() => Boardcolumn, (boardColumn) => boardColumn.board, {
    cascade: true,
  })
  columns: Boardcolumn[];

  @OneToMany(() => Label, (label) => label.board, {
    cascade: ['remove', 'update'],
  })
  labels: Label[];
}
