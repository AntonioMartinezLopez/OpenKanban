import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boardcolumn } from 'src/boardcolumn/entities/boardcolumn.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Task } from 'src/task/entities/task.entity';
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

  async create(createBoardInput: CreateBoardInput): Promise<Board> {
    const group = await this.groupRepository.findOne({
      relations: ['board'],
      where: { id: createBoardInput.groupId },
    });

    // if group not found return exeception
    if (!group) {
      throw new NotFoundException('Unknown Group Id');
    }

    // prevent further process when group already initialized a board
    if (group.board) {
      throw new ForbiddenException('Group already has a board');
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
    return updatedGroup.board;
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find({});
  }

  findOne(id: string): Promise<Board> {
    return this.boardRepository.findOneBy({ id: id });
  }

  async update(id: string, updateBoardInput: UpdateBoardInput): Promise<Board> {
    let board = await this.boardRepository.findOneBy({ id: id });

    board = { ...board, ...updateBoardInput };
    return this.boardRepository.save(board);
  }

  async remove(id: string): Promise<Board> {
    // load entity
    const board = await this.boardRepository.findOneBy({ id: id });

    if (board) {
      return this.boardRepository.remove(board);
    }

    throw new NotFoundException('Unknown Board Id');
  }

  //Field Resolvers
  async resolveBoardColumns(boardId: string): Promise<Boardcolumn[]> {
    const result = await this.boardRepository.findOne({
      relations: ['columns'],
      where: { id: boardId },
    });
    return result.columns;
  }

  async resolveTasks(boardId: string): Promise<Task[]> {
    const result = await this.boardRepository.findOne({
      relations: ['tasks'],
      where: { id: boardId },
    });
    return result.tasks;
  }
}
