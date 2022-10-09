import { ObjectType, Field } from '@nestjs/graphql';
// import { Group } from 'src/groups/entities/group.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @OneToOne(() => Group, { onDelete: 'CASCADE' })
  // group: Group;
}
