import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { userRole } from '@prisma/client';
import { ROLES_KEY } from '../../../decorators/role.decorator';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<userRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (!request) {
      return false;
    }

    const user = jwt.verify(
      request.cookies.access_token,
      process.env.JWT_SECRET,
    );

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
