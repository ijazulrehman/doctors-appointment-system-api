import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserRole } from 'src/user/user.enum';
import { Roles } from 'src/auth/decorator/role.decorator';

let a = 0;
@Controller('slot')
@ApiTags('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.DOCOTOR)
  @Post()
  async create(@Body() createSlotDto: CreateSlotDto, @Req() req) {

    const { doctorId } = req.user;
    return await this.slotService.create(createSlotDto, doctorId);
  }
}
