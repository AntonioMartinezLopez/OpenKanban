import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardService } from 'src/board/board.service';
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
      throw new NotFoundException('Unknown Board Id');
    }
    return boardCol;
  }

  update(id: string, updateBoardcolumnInput: UpdateBoardcolumnInput) {
    return `This action updates a #${id} boardcolumn`;
  }

  remove(id: string) {
    return `This action removes a #${id} boardcolumn`;
  }
}
