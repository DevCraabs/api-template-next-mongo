// src/core/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // attrape tout (HttpException ou erreurs inattendues)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx       = host.switchToHttp();
    const response  = ctx.getResponse<Response>();
    const request   = ctx.getRequest<Request>();

    let status      = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status  = exception.getStatus();
      const r = exception.getResponse();
      // r peut être string | object : on normalise un peu
      message = typeof r === 'string' ? r : (r as any).message ?? r;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const payload = {
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    // Ici, demain, on pourra notifier Discord si status >= 500
    // if (status >= 500) await this.discordTransport.send('error', 'Unhandled error', payload)

    response.status(status).json(payload);
  }
}
