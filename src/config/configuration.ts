export default () => ({
  // on met des valeurs "propres" prêtes à lire via ConfigService
  port: Number(process.env.PORT ?? 3000),
  mongoUri: process.env.MONGO_URI,      // validé par Zod (voir plus bas)
  jwtSecret: process.env.JWT_SECRET,    // validé par Zod
});
