import { z } from 'zod';

// 1) On définit le "contrat" de ton .env :
const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/).default('3000'),
  MONGO_URI: z.string().min(1, '❌ MONGO_URI est obligatoire'),
  JWT_SECRET: z.string().min(8, '❌ JWT_SECRET doit contenir au moins 8 caractères'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_NAME: z.string().optional(),
  APP_VERSION: z.string().optional(),
  SWAGGER_TITLE: z.string().optional(),
  SWAGGER_DESCRIPTION: z.string().optional(),
  SWAGGER_PATH: z.string().optional(),
});

// 2) On expose un validateur appelé par ConfigModule
export const validateEnv = (config: Record<string, unknown>) => {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    // Affichage clair des erreurs et arrêt de l’app
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.format());
    process.exit(1);
  }
  return parsed.data; // renvoyé à ConfigModule (utile si tu veux typer derrière)
};
