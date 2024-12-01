import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('Required Roles:', requiredRoles);
        if (!requiredRoles) {
            return true;
        }

        console.log('Request user in JwtAuthGuard:', request.user);
        const user = request.user;
        console.log('Required roles:', requiredRoles);
        console.log('User in RolesGuard:', user);
        console.log('User:', user);

        if (!user || !user.role) {
            return false;
        }

        return requiredRoles.includes(user.role);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
