/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new UnauthorizedException('Not logged in');
    }

    if (req.user.role !== 'admin' || req.user.adminLevel !== 2) {
      throw new UnauthorizedException('Super admins only');
    }

    return true;
  }
}

export { SuperAdminGuard };
