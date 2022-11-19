import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardService } from 'src/board/board.service';
import { Repository } from 'typeorm';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private labelRepository: Repository<Label>,
    @Inject(forwardRef(() => BoardService))
    private boardService: BoardService,
  ) {}

  async create(createLabelInput: CreateLabelInput) {
    // search for existing board
    const { boardId, ...boardProps } = createLabelInput;
    const board = await this.boardService.findOne(boardId);

    if (!board) {
      throw new NotFoundException('Unknown board id');
    }

    const newLabel = new Label();
    newLabel.name = boardProps.name;
    newLabel.color = boardProps.color;
    newLabel.board = board;

    return this.labelRepository.save(newLabel);
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
