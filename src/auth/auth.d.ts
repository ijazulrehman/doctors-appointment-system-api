//

import { UserRole } from "src/user/user.enum";

export interface UserInfo {
    id: string,
    name: string,
    role: UserRole,
    email: string
}

export interface AuthPayload extends UserInfo {
    patientId?: string,
    doctorId?: string
}

export interface AuthResponse extends UserInfo {
    token: string
}