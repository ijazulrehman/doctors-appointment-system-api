import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/user/user.enum';
import { PatientEntity } from './entities/patient.entity';

@Controller('patients')
@ApiTags('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.PATIENT)
  @Post()
  async create(
    @Body() updatePatientDto: UpdatePatientDto,
    @Req() req
  ) {
    const { patientId } = req.user;
    return await this.patientService.addOrUpdate(updatePatientDto, patientId);
  }

}
