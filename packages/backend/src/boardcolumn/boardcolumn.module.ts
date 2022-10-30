import { Module } from '@nestjs/common';
import { BoardcolumnService } from './boardcolumn.service';
import { BoardcolumnResolver } from './boardcolumn.resolver';
import { BoardModule } from 'src/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardcolumn } from './entities/boardcolumn.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boardcolumn]), BoardModule],
  providers: [BoardcolumnResolver, BoardcolumnService],
})
export class BoardcolumnModule {}
