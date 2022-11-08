import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { BoardcolumnService } from './boardcolumn.service';
import { Boardcolumn } from './entities/boardcolumn.entity';
import { CreateBoardcolumnInput } from './dto/create-boardcolumn.input';
import { UpdateBoardcolumnInput } from './dto/update-boardcolumn.input';
import { Task } from 'src/task/entities/task.entity';

@Resolver(() => Boardcolumn)
export class BoardcolumnResolver {
  constructor(private readonly boardcolumnService: BoardcolumnService) {}

  @Mutation(() => Boardcolumn)
  createBoardcolumn(
    @Args('createBoardcolumnInput')
    createBoardcolumnInput: CreateBoardcolumnInput,
  ) {
    return this.boardcolumnService.create(createBoardcolumnInput);
  }

  @Query(() => Boardcolumn, { name: 'boardcolumn' })
  async findOne(@Args('id') id: string) {
    return this.boardcolumnService.findOne(id);
  }

  @Mutation(() => Boardcolumn)
  updateBoardcolumn(
    @Args('updateBoardcolumnInput')
    updateBoardcolumnInput: UpdateBoardcolumnInput,
  ) {
    return this.boardcolumnService.update(
      updateBoardcolumnInput.id,
      updateBoardcolumnInput,
    );
  }

  @Mutation(() => Boardcolumn)
  removeBoardcolumn(@Args('id') id: string) {
    return this.boardcolumnService.remove(id);
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() board: Boardcolumn): Promise<Task[]> {
    return this.boardcolumnService.resolveTasks(board.id);
  }
}
