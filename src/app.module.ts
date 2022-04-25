import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { SlotModule } from './slot/slot.module';
import { AppointmentModule } from './appointment/appointment.module';
import typeOrmConfig from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    SlotModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
