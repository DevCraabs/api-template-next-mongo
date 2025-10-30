import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validateEnv } from './config/validation';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // 1) Charge .env globalement + applique la validation Zod
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    // 2) Connexion Mongo ASYNC (attend que .env soit chargé avec footRootAsync)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongoUri'), // <- vient de configuration.ts
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
