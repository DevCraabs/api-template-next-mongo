import { z } from 'zod';

// 1) On définit le "contrat" de ton .env :
const envSchema = z.object({
  PORT: z.string().regex(/^\d+$/).default('3000'),
  MONGO_URI: z.string().url().or(z.string().startsWith('mongodb://')),
  JWT_SECRET: z.string().min(10), // évite les secrets trop courts
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
