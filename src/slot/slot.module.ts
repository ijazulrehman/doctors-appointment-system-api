import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotEntity } from './entities/slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlotEntity])],
  controllers: [SlotController],
  providers: [SlotService]
})
export class SlotModule { }
