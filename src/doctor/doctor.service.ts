import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(DoctorEntity)
    private doctorsRepository: Repository<DoctorEntity>
  ) { }
  create(createDoctorDto: CreateDoctorDto) {
    return 'This action adds a new doctor';
  }

  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<{
    updated: boolean,
    message?: string
  }> {
    try {
      await this.doctorsRepository.update(id, updateDoctorDto)

      return { updated: true }
    } catch (error) {
      return {
        updated: false,
        message: "Something went wrong. please try later!"
      }
    }

    return { updated: false }
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
