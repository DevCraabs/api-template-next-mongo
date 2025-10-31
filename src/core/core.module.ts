// src/core/core.module.ts
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppLogger } from './logger/logger.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Global() // rend disponibles ses providers partout sans réimport
@Module({
  providers: [
    AppLogger, // Logger injectable
    { provide: APP_FILTER, useClass: HttpExceptionFilter },      // Filter global
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }, // Interceptor global
  ],
  exports: [AppLogger], // pour pouvoir injecter AppLogger ailleurs
})
export class CoreModule {}
