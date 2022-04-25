import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserGender, UserRole } from "../user.enum";

export class CreateUserDto {
    @ApiProperty({
        required: true,
        description: "User emil",
    })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    email: string;

    @ApiProperty({
        description: "Full name of user",
        required: false
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        description: "Mobile number of user",
        required: false
    })
    @IsOptional()
    @IsMobilePhone()
    phoneNumber: string;

    @ApiProperty({
        description: "Date of Birth of user",
        required: false
    })
    @IsOptional()
    @IsDateString()
    dob: Date

    @ApiProperty({
        required: false,
        enum: UserGender
    })
    @IsOptional()
    @IsEnum(UserGender)
    gender: UserGender

    @ApiProperty({
        required: true,
        enum: UserRole
    })
    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole

    @ApiProperty({
        required: true,
        description: "Password"
    })
    @IsString()
    password: string;
}
