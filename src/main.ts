import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // ── Config centrale
  const port = config.get<number>('port') ?? 3000;
  const appName = config.get<string>('appName') ?? 'WeDevArt API';
  const appVersion = config.get<string>('appVersion') ?? '0.1';

  const swaggerCfg = config.get<{
    title: string;
    description: string;
    version: string;
    path: string;
  }>('swagger');

  // ── CORS (sobre, on ajustera si besoin)
  app.enableCors();

  // ── Class-validator/transformer
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // ← important, active class-transformer
  }),
);

  // ── Swagger (tout depuis la config)
  const swaggerConfig = new DocumentBuilder()
    .setTitle(swaggerCfg?.title ?? appName)
    .setDescription(swaggerCfg?.description ?? 'API documentation')
    .setVersion(swaggerCfg?.version ?? appVersion)
    .addTag('Core')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerCfg?.path ?? 'docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      displayRequestDuration: true,
      filter: true,
    },
    customSiteTitle: `${appName} Docs`,
    customCss: `
      body { background-color: #111; color: #ddd; }
      .swagger-ui .topbar { background-color: #1a1a1a; border-bottom: 2px solid #f1c40f; }
      .swagger-ui .btn.authorize { background-color: #f1c40f !important; color: #000 !important; }
      .swagger-ui .opblock.opblock-get { border-color: #f1c40f; background: #1f1f1f; }
      .swagger-ui .opblock.opblock-post { border-color: #f39c12; background: #1f1f1f; }
    `,
  });

  // (plus tard: Helmet, rate-limit, prefix global éventuel)
  await app.listen(port);

  // ── Bannière WeDevArt
  const bannerLines = [
    " __      __       ________                _____          __   ",
    "/  \\    /  \\ ____ \\______ \\   _______  __/  _  \\________/  |_ ",
    "\\   \\/\\/   // __ \\ |    |  \\_/ __ \\  \\/ /  /_\\  \\_  __ \\   __\\",
    " \\        /\\  ___/ |    `   \\  ___/\\   /    |    \\  | \\/|  |  ",
    "  \\__/\\  /  \\___  >_______  /\\___  >\\_/\\____|__  /__|   |__|  ",
    "       \\/       \\/        \\/     \\/            \\/             ",
  ];
  for (const line of bannerLines) console.log('\x1b[33m%s\x1b[0m', line);

  const docsPath = `/${swaggerCfg?.path ?? 'docs'}`;
  console.log('\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m');
  console.log(`\x1b[33m💡 ${appName} v${appVersion} | Powered by Nest + Mongo\x1b[0m`);
  console.log(`📘 Swagger Docs → http://localhost:${port}${docsPath}`);
  console.log(`🚀 Server running on  http://localhost:${port}`);
  console.log('\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m\n');
}
bootstrap();
