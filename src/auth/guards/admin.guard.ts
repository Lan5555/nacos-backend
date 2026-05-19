/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);

    if (!req.user) {
      throw new UnauthorizedException('Not logged in');
    }

    if (req.user.role !== 'admin' && !req.user.isAdmin) {
      throw new UnauthorizedException('Admins only');
    }

    return true;
  }
}
