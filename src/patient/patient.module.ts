import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity])
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule { }
