import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class DebugThrottlerGuard extends ThrottlerGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const result = await super.canActivate(context);
    console.log(
      `🧩 [ThrottlerGuard] Route: ${req.method} ${req.url} → ${
        result ? 'ALLOWED' : 'BLOCKED'
      }`,
    );
    return result;
  }
}
