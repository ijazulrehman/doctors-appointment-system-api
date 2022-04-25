import { ApiProperty } from "@nestjs/swagger";
import { BloodGroup } from "../patient.enum";

export class CreatePatientDto {
    @ApiProperty({
        description: 'blood group of patient',
        enum: BloodGroup
    })
    bloodGroup: BloodGroup
}
