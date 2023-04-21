import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { Repository } from 'typeorm';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private labelRepository: Repository<Label>,
    @Inject(forwardRef(() => GroupsService))
    private groupService: GroupsService,
  ) {}

  async create(createLabelInput: CreateLabelInput) {
    // search for existing board
    const { groupId, ...boardProps } = createLabelInput;
    const group = await this.groupService.findOnebyId(groupId);

    if (!group) {
      throw new NotFoundException('Unknown group id');
    }

    const newLabel = new Label();
    newLabel.name = boardProps.name;
    newLabel.color = boardProps.color;
    newLabel.group = group;

    return this.labelRepository.save(newLabel);
  }

  findAll() {
    return this.labelRepository.find();
  }

  async findOne(labelId: string) {
    const label = await this.labelRepository.findOneBy({ id: labelId });
    if (!label) {
      throw new NotFoundException('Unknown label id');
    }
    return label;
  }

  async update(updateLabelInput: UpdateLabelInput) {
    const { labelId, ...labelProps } = updateLabelInput;

    let label = await this.labelRepository.findOneBy({ id: labelId });

    if (!label) {
      throw new NotFoundException('Unknown label id');
    }

    label = { ...label, ...labelProps };

    return this.labelRepository.save(label);
  }

  async remove(labelId: string) {
    const label = await this.labelRepository.findOneBy({ id: labelId });

    if (!label) {
      throw new NotFoundException('Unknown label id');
    }

    return this.labelRepository.remove(label);
  }
}
