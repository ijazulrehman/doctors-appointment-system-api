import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { SlotEntity } from './entities/slot.entity';
import { WeekDay } from './slot.enum';

@Injectable()
export class SlotService {

  constructor(
    @InjectRepository(SlotEntity)
    private slotsRepository: Repository<SlotEntity>
  ) {

  }
  async create(createSlotDto: CreateSlotDto, doctorId: string) {

    const updateSlot: SlotEntity = await this.findSlotBasedDoctorIdAndWeekDay(
      doctorId,
      createSlotDto.weekDay
    )

    if (updateSlot) {
      updateSlot.start = createSlotDto.start
      updateSlot.end = createSlotDto.end

      return updateSlot.save();
    }


    const newSlot = new SlotEntity({
      ...createSlotDto,
      doctor: {
        id: doctorId
      }
    });

    return await newSlot.save()
  }

  async findSlotBasedDoctorIdAndWeekDay(
    doctorId: string,
    weekDay: WeekDay
  ): Promise<SlotEntity | null> {
    try {
      return this.slotsRepository.findOne({
        where: {
          weekDay,
          doctor: {
            id: doctorId
          },

        }
      })

    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException({
          doctorId
        }, 'doctorId isn\'t correct')
      }
    }
  }

}
