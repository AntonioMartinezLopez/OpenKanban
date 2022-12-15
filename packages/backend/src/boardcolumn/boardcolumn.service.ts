import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardService } from 'src/board/board.service';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateBoardcolumnInput } from './dto/create-boardcolumn.input';
import { UpdateBoardcolumnInput } from './dto/update-boardcolumn.input';
import { Boardcolumn } from './entities/boardcolumn.entity';

@Injectable()
export class BoardcolumnService {
  constructor(
    @InjectRepository(Boardcolumn)
    private boardColumnRepository: Repository<Boardcolumn>,
    @Inject(forwardRef(() => BoardService))
    private boardService: BoardService,
  ) {}

  async create(
    createBoardcolumnInput: CreateBoardcolumnInput,
  ): Promise<Boardcolumn> {
    const newBoardColumn = new Boardcolumn();
    newBoardColumn.name = createBoardcolumnInput.name;
    newBoardColumn.maxWeight = createBoardcolumnInput.maxWeight;

    const board = await this.boardService.findOne(
      createBoardcolumnInput.boardId,
    );
    if (!board) {
      throw new NotFoundException('Unknown Board id');
    }

    newBoardColumn.board = board;
    return this.boardColumnRepository.save(newBoardColumn);
  }

  async findOne(id: string): Promise<Boardcolumn> {
    const boardCol = await this.boardColumnRepository.findOneBy({ id: id });
    if (!boardCol) {
      throw new NotFoundException('Unknown Board Column Id');
    }
    return boardCol;
  }

  async update(
    id: string,
    updateBoardcolumnInput: UpdateBoardcolumnInput,
  ): Promise<Boardcolumn> {
    let boardCol = await this.boardColumnRepository.findOneBy({ id: id });
    if (!boardCol) {
      throw new NotFoundException('Unknown Board Column Id');
    }

    boardCol = { ...boardCol, ...updateBoardcolumnInput };

    return this.boardColumnRepository.save(boardCol);
  }

  async remove(id: string) {
    const boardCol = await this.boardColumnRepository.findOneBy({ id: id });
    if (boardCol) {
      return this.boardColumnRepository.remove(boardCol);
    }

    throw new NotFoundException('Unknown Board Column Id');
  }

  //Resolver functions

  async resolveTasks(boardColumnId: string): Promise<Task[]> {
    const result = await this.boardColumnRepository.findOne({
      relations: ['tasks'],
      where: { id: boardColumnId },
    });
    return result.tasks;
  }
}
