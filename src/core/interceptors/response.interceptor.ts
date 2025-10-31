// src/core/interceptors/response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const started = Date.now();
    return next.handle().pipe(
      map((data) => {
        // ✳️ Astuce : permettre à un handler d’opt-out (si tu veux répondre "brut")
        if (data && (data as any)._raw === true) return (data as any).payload;

        return {
          success: true,
          data,
          duration: `${Date.now() - started}ms`,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
