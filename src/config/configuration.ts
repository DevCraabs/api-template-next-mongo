export default () => ({
  // ───── Config basique accessible partout via ConfigService ─────
  port: Number(process.env.PORT ?? 3000),

  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/we-devart-db',

  jwtSecret: process.env.JWT_SECRET || 'changeme123',

  nodeEnv: process.env.NODE_ENV || 'development',

  // ───── Valeurs d’identité de ton API ─────
  appName: process.env.APP_NAME || 'WeDevArt API',
  appVersion: process.env.APP_VERSION || '0.1',

  // ───── Swagger (optionnel, mais pratique) ─────
  swagger: {
    title: process.env.SWAGGER_TITLE || 'WeDevArt API',
    description:
      process.env.SWAGGER_DESCRIPTION ||
      '📘 Documentation de l’API WeDevArt - NestJS + Mongo',
    version: process.env.SWAGGER_VERSION || '0.1',
    path: process.env.SWAGGER_PATH || 'docs',
  },
});
