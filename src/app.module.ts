import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validateEnv } from './config/validation';
import { HealthModule } from './health/health.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt_auth.guard';
import { RolesGuard } from './auth/guards/roles_guard';

@Module({
  imports: [
    // ───── Configuration globale (.env + validation) ─────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    // ───── Connexion MongoDB asynchrone ─────
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),

    // ───── Throttler (rate limiting global) ─────
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'global',
          ttl: seconds(10), // 10 secondes
          limit: 3,         // 3 requêtes max
        },
      ],
    }),

    // ───── Modules applicatifs ─────

    CoreModule,
    UsersModule,
    HealthModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
