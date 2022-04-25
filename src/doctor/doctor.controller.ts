import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRole } from 'src/user/user.enum';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
@ApiTags('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.DOCOTOR)
  @Post()
  @Post(':id')
  update(
    @Req() req,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    const { doctorId } = req.user
    return this.doctorService.update(doctorId, updateDoctorDto);
  }

}
