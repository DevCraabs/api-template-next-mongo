import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const targetId = req.params.id;

    const isAdmin = user.role.toLowerCase === 'admin';
    const isOwner = user.userId?.toString() === targetId?.toString();

    if (isAdmin || isOwner) return true;

    throw new ForbiddenException(
      'Accès refusé : vous ne pouvez accéder qu’à vos propres données.',
    );
  }
}

