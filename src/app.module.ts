import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validateEnv } from './config/validation';
import { HealthModule } from './health/health.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // ───── 1) Configuration globale (.env + validation) ─────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    // ───── 2) Connexion MongoDB asynchrone ─────
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),

    // ───── 3) Modules applicatifs ─────
    CoreModule,
    UsersModule,
    HealthModule,
  ],
})
export class AppModule {}
