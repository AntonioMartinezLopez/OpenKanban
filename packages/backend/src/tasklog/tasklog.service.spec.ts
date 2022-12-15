import { Test, TestingModule } from '@nestjs/testing';
import { TasklogService } from './tasklog.service';

describe('TasklogService', () => {
  let service: TasklogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasklogService],
    }).compile();

    service = module.get<TasklogService>(TasklogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
