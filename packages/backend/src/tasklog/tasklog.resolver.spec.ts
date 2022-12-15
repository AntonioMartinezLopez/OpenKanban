import { Test, TestingModule } from '@nestjs/testing';
import { TasklogResolver } from './tasklog.resolver';
import { TasklogService } from './tasklog.service';

describe('TasklogResolver', () => {
  let resolver: TasklogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasklogResolver, TasklogService],
    }).compile();

    resolver = module.get<TasklogResolver>(TasklogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
