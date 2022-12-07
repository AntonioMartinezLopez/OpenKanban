import { ObjectType, Field } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Message Id' })
  id: string;

  @CreateDateColumn()
  @Field({ description: 'Timestamp for creation of message' })
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text')
  @Field({ description: 'The content of the message' })
  text: string;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn()
  creator: User;

  @ManyToOne(() => Group, (group) => group.messages, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
    eager: true,
  })
  group: Group;
}
