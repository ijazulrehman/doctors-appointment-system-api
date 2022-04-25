import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientEntity } from './entities/patient.entity';

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(PatientEntity)
    private patientsRepository: Repository<PatientEntity>
  ) { }
  async addOrUpdate(
    updatePatientDto: UpdatePatientDto,
    patientId: string
  ): Promise<{
    updated: boolean,
    message?: string
  }> {

    try {
      const status = await this.patientsRepository.update(patientId, updatePatientDto)

      if (status)
        return { updated: true }

    } catch (error) {
      return {
        updated: false,
        message: "Something went wrong. please try later!"
      }

    }

    return { updated: false }
  }

  async getPatient(patientId: string): Promise<PatientEntity | null> {
    try {
      return await this.patientsRepository.findOne({
        where: { id: patientId },
        relations: ['user']
      })
    } catch (error) {
      throw error
    }
  }
}
