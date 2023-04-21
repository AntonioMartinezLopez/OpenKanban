import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), GroupsModule],
  providers: [LabelResolver, LabelService],
  exports: [LabelService],
})
export class LabelModule {}
