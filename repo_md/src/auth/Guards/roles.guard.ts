import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const payload = request.user;

    const hasRole = () => requiredRoles.some(payload?.rol?.includes(Roles));
    const validate = payload && payload.roles && hasRole();
    if (!validate) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este contenido',
      );
    }
    return validate;
  }
}
