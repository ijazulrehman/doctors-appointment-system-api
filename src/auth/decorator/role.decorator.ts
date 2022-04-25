//

import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/user.enum';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => {
    console.log(roles, "rolers")
    return SetMetadata(ROLES_KEY, roles);
} 