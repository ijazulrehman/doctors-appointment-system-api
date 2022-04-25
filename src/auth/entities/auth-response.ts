//

import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { UserRole } from "src/user/user.enum";
import { AuthResponse } from "../auth";

export class AuthReponseEntity implements AuthResponse {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        enum: UserRole
    })
    role: UserRole

    @ApiProperty()
    email: string;

    @ApiProperty()
    token: string;
}