import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDoctorDto {

    @ApiProperty({
        description: 'Specilization of docotor'
    })
    @IsString()
    specialization: string
}
