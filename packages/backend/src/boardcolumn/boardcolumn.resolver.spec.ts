import { Test, TestingModule } from '@nestjs/testing';
import { BoardcolumnResolver } from './boardcolumn.resolver';
import { BoardcolumnService } from './boardcolumn.service';

describe('BoardcolumnResolver', () => {
  let resolver: BoardcolumnResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardcolumnResolver, BoardcolumnService],
    }).compile();

    resolver = module.get<BoardcolumnResolver>(BoardcolumnResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
