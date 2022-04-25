import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRole } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity(createUserDto);
    try {
      let newUser = await user.save();

      delete newUser.password;
      delete newUser.encryptedPassword;

      return newUser;
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException('Email already exits', HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ['doctorProfile', 'patientProfile']
    });

    if (user.role === UserRole.DOCOTOR)
      delete user.patientProfile;
    else if (user.role === UserRole.PATIENT)
      delete user.doctorProfile;

    delete user.password;
    delete user.encryptedPassword;

    return user;

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

}
