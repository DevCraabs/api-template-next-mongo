import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('port') ?? 3000; // défini dans configuration.ts, si valeur vide ou inconnu demarre sur port = 3000

  // (plus tard on mettra Helmet, CORS, rate-limit ici)
  await app.listen(port);
const bannerLines = [
  " __      __       ________                _____          __   ",
  "/  \\    /  \\ ____ \\______ \\   _______  __/  _  \\________/  |_ ",
  "\\   \\/\\/   // __ \\ |    |  \\_/ __ \\  \\/ /  /_\\  \\_  __ \\   __\\",
  " \\        /\\  ___/ |    `   \\  ___/\\   /    |    \\  | \\/|  |  ",
  "  \\__/\\  /  \\___  >_______  /\\___  >\\_/\\____|__  /__|   |__|  ",
  "       \\/       \\/        \\/     \\/            \\/             ",
];

for (const line of bannerLines) {
  console.log('\x1b[33m%s\x1b[0m', line); // doré ligne par ligne
}


  console.log('\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m');
  console.log('\x1b[33m💡 WeDevArt API v0.1 | Powered by Nest + Mongo\x1b[0m');
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log('\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m\n');


}
bootstrap();
