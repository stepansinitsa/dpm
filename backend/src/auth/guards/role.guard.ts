import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private expectedRole: Role) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session?.user;
    return user?.role === this.expectedRole;
  }
}