import { ObjectType, Field } from '@nestjs/graphql';
import { Board } from 'src/board/entities/board.entity';
import { Label } from 'src/label/entities/label.entity';
import { Message } from 'src/message/entities/message.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'Group Id' })
  id: string;

  @Column('text')
  @Field({ description: 'The name of the group' })
  name: string;

  @Column('text')
  @Field({ description: 'Description of the group' })
  description: string;

  @ManyToMany(() => User, (user) => user.groups, {
    cascade: ['insert'],
  })
  @JoinTable()
  users: User[];

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'SET NULL' })
  @JoinColumn()
  creator: User;

  @OneToOne(() => Board, {
    cascade: ['insert', 'remove'],
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  board: Board;

  @OneToMany(() => Message, (msg) => msg.group)
  messages: Message[];

  @OneToMany(() => Task, (task) => task.group, {
    cascade: ['insert', 'update', 'remove'],
  })
  tasks: Task[];

  @OneToMany(() => Label, (label) => label.group, {
    cascade: ['remove', 'update'],
  })
  labels: Label[];
}
