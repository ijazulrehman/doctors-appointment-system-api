//

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyJWT } from 'src/lib/encryption';
import { UserRole } from 'src/user/user.enum';
import { AuthPayload } from '../auth';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { headers } = context.switchToHttp().getRequest();
        if (!headers['authorization'])
            return false
        const token = headers['authorization'].split(' ')[1];
        try {
            const user = verifyJWT(token)
            return requiredRoles.includes(user['role']);

        } catch (error) {
            return false
        }
    }
}