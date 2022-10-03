import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  private readonly logger = new Logger(BoardService.name);

  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(createBoardInput: CreateBoardInput) {
    const group = await this.groupRepository.findOneBy({
      id: createBoardInput.groupId,
    });

    // if group not found return exeception
    if (!group) {
      throw new NotFoundException('Unknown Group Id');
    }
    // create new Board
    const newBoard = new Board();
    newBoard.description = createBoardInput.description;
    newBoard.name = createBoardInput.name;

    // assign to group
    group.board = newBoard;

    // save and cascade
    const updatedGroup = await this.groupRepository.save(group);

    // return newly created board class from table
    return this.boardRepository.findBy({ id: updatedGroup.board.id });
  }

  findAll() {
    return `This action returns all board`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: string, updateBoardInput: UpdateBoardInput) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
