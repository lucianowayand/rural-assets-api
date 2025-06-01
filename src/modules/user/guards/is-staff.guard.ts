import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { USER_ROLE } from '../user.entity';

@Injectable()
export class IsStaffGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = this.jwtService.verify(token, {
      secret: process.env.SECRET,
    });

    if (user.role !== USER_ROLE.STAFF) throw new UnauthorizedException('User is not staff');

    return true;
  }
}
