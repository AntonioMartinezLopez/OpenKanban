import { Test, TestingModule } from '@nestjs/testing';
import { BoardcolumnService } from './boardcolumn.service';

describe('BoardcolumnService', () => {
  let service: BoardcolumnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardcolumnService],
    }).compile();

    service = module.get<BoardcolumnService>(BoardcolumnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
