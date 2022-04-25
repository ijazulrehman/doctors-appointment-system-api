import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayload, AuthResponse, UserInfo } from './auth';
import { LoginCredentialDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) { }

    async login(loginCredentialDto: LoginCredentialDto): Promise<AuthResponse> {

        console.log(loginCredentialDto)
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    email: loginCredentialDto.email
                }
            })

            if (!user)
                throw new UnauthorizedException('Invalid credentails');

            const isValid = await user.comparePassword(loginCredentialDto.password);

            if (!isValid)
                throw new UnauthorizedException('Invalid credentails');

            const { id, email, role, name } = user;
            return { id, email, role, name, token: user.jwt }
        } catch (err) {
            throw new UnauthorizedException('Invalid credentails');
        }

    }

    async validateUser(payload: AuthPayload): Promise<AuthPayload> {

        const user = await this.usersRepository.findOne({
            where: { email: payload.email },
            relations: ["doctorProfile", "patientProfile"]
        })
        if (!user) {
            throw new UnauthorizedException('You are not alowed to perform this action')
        }

        const { id, email, role, name, doctorProfile: doctorProfile, patientProfile: patientProfile } = user;
        if (doctorProfile) {
            const { id: doctorId } = doctorProfile;
            return { id, email, role, name, doctorId: doctorId };
        } else if (patientProfile) {
            const { id: patientId } = patientProfile;
            return { id, email, role, name, patientId };
        }

        return { id, email, role, name }

    }

    decodeAuthHeader(req): AuthPayload {
        const token = req.headers['Authorization'];
        return token;
    }
}
