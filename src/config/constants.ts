// src/config/constants.ts
// ───────────────────────────────────────────────
// 💡 WeDevArt Global Constants
// Centralise toutes les constantes réutilisées
// dans l'application (environnements, Swagger, etc.)
// ───────────────────────────────────────────────

// ───── Application Info ─────
export const APP_NAME = 'WeDevArt API';
export const APP_DESCRIPTION = 'Template NestJS + MongoDB + CoreModule';
export const APP_VERSION = '0.2';

// ───── Ports & Defaults ─────
export const DEFAULT_PORT = 3000;

// ───── Environment Names ─────
export const ENV_DEV = 'development';
export const ENV_PROD = 'production';
export const ENV_TEST = 'test';

// ───── Swagger Configuration ─────
export const SWAGGER_TITLE = `${APP_NAME} Docs`;
export const SWAGGER_DESCRIPTION = `${APP_DESCRIPTION} - Documentation interactive générée automatiquement.`;
export const SWAGGER_VERSION = APP_VERSION;
export const SWAGGER_PATH = 'docs';

// ───── Logger & Colors (à étendre plus tard) ─────
export const LOGGER_PREFIX = '[WeDevArt]';
export const LOGGER_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// ───── Discord Integration (placeholder) ─────
export const DISCORD_LOGGER_ACTIVE = false; // changera quand on branchera le transport
export const DISCORD_MIN_LEVEL = 'warn'; // niveaux possibles : 'log' | 'warn' | 'error'

// ───── Database Defaults ─────
export const DEFAULT_DB_NAME = 'we-devart-db';

// ───── Health Check Defaults ─────
export const HEALTH_OK_MESSAGE = 'Service operational';
export const HEALTH_ERROR_MESSAGE = 'Service unavailable';

// ───── Internal Codes / Tags ─────
export const INTERNAL_TAGS = {
  CORE: 'Core',
  AUTH: 'Auth',
  USERS: 'Users',
  HEALTH: 'Health',
  LOGGER: 'Logger',
};
