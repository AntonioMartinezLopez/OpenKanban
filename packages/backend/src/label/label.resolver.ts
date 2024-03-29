import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LabelService } from './label.service';
import { Label } from './entities/label.entity';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Resolver(() => Label)
export class LabelResolver {
  constructor(private readonly labelService: LabelService) {}

  @Mutation(() => Label)
  createLabel(@Args('createLabelInput') createLabelInput: CreateLabelInput) {
    return this.labelService.create(createLabelInput);
  }

  @Query(() => [Label], { name: 'labels' })
  findAll() {
    return this.labelService.findAll();
  }

  @Query(() => Label, { name: 'label' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.labelService.findOne(id);
  }

  @Mutation(() => Label)
  updateLabel(@Args('updateLabelInput') updateLabelInput: UpdateLabelInput) {
    return this.labelService.update(updateLabelInput);
  }

  @Mutation(() => Label)
  removeLabel(@Args('id', { type: () => String }) id: string) {
    return this.labelService.remove(id);
  }
}
