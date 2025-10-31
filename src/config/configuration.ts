// src/config/configuration.ts
import {
  APP_NAME,
  APP_VERSION,
  SWAGGER_TITLE,
  SWAGGER_DESCRIPTION,
  SWAGGER_PATH,
  DEFAULT_PORT,
} from './constants';

export default () => ({
  port: Number(process.env.PORT) || DEFAULT_PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,

  // App Info
  appName: APP_NAME,
  appVersion: APP_VERSION,

  // Swagger
  swagger: {
    title: SWAGGER_TITLE,
    description: SWAGGER_DESCRIPTION,
    version: APP_VERSION,
    path: SWAGGER_PATH,
  },
});
