import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { Boardcolumn } from 'src/boardcolumn/entities/boardcolumn.entity';
import { Task } from 'src/task/entities/task.entity';
import { Label } from 'src/label/entities/label.entity';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Mutation(() => Board)
  createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput) {
    return this.boardService.create(createBoardInput);
  }

  @Query(() => [Board], { name: 'boards' })
  findAll() {
    return this.boardService.findAll();
  }

  @Query(() => Board, { name: 'board' })
  findOne(@Args('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Mutation(() => Board)
  updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
    return this.boardService.update(updateBoardInput.id, updateBoardInput);
  }

  @Mutation(() => Board)
  removeBoard(@Args('id') id: string) {
    return this.boardService.remove(id);
  }

  @ResolveField(() => [Boardcolumn])
  async columns(@Parent() board: Board): Promise<Boardcolumn[]> {
    return this.boardService.resolveBoardColumns(board.id);
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() board: Board): Promise<Task[]> {
    return this.boardService.resolveTasks(board.id);
  }

  @ResolveField(() => [Label])
  async labels(@Parent() board: Board): Promise<Label[]> {
    return this.boardService.resolveLabels(board.id);
  }
}
