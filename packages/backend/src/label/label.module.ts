import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), BoardModule],
  providers: [LabelResolver, LabelService],
})
export class LabelModule {}
