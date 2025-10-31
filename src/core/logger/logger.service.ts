// src/core/logger/logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';

type LogLevel = 'log' | 'warn' | 'error' | 'debug' | 'verbose';

@Injectable()
export class AppLogger implements LoggerService {
    // ⇩ demain on branchera ici un transport Discord en plus de la console
    //export class DiscordTransport {
    //constructor(private webhookUrl: string) {}
    //async send(level: string, message: string, meta?: unknown) {
    // POST webhook Discord avec { content: ... } (formaté par niveau)

    private write(level: LogLevel, message: string, meta?: unknown) {
        const ts = new Date().toISOString();
        const line = `[${ts}] [${level.toUpperCase()}] ${message}`;

        switch (level) {
            case 'error':
                console.error('\x1b[31m%s\x1b[0m', line, meta ?? '');
                break;
            case 'warn':
                console.warn('\x1b[33m%s\x1b[0m', line, meta ?? '');
                break;
            case 'debug':
            case 'verbose':
                console.debug('\x1b[90m%s\x1b[0m', line, meta ?? '');
                break;
            default:
                 console.log('\x1b[37m%s\x1b[0m', line, meta ?? '');
        }
    }

    log(message: string, meta?: unknown) { this.write('log', message, meta); }
    warn(message: string, meta?: unknown) { this.write('warn', message, meta); }
    error(message: string, trace?: string) { this.write('error', message, trace); }
    debug(message: string, meta?: unknown) { this.write('debug', message, meta); }
    verbose(message: string, meta?: unknown) { this.write('verbose', message, meta); }
}
