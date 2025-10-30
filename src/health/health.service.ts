import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class HealthService {
  private readonly startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  getStatus() {
    const dbState = mongoose.connection.readyState;
    const dbStatus =
      dbState === 1
        ? 'connected'
        : dbState === 2
        ? 'connecting'
        : dbState === 0
        ? 'disconnected'
        : 'unknown';

    // Calcul de l'uptime (durée depuis le lancement du serveur)
    const uptimeMs = Date.now() - this.startTime;
    const seconds = Math.floor(uptimeMs / 1000) % 60;
    const minutes = Math.floor(uptimeMs / (1000 * 60)) % 60;
    const hours = Math.floor(uptimeMs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));

    let uptimeString = '';
    if (days > 0) uptimeString += `${days}d `;
    if (hours > 0) uptimeString += `${hours}h `;
    if (minutes > 0) uptimeString += `${minutes}m `;
    uptimeString += `${seconds}s`;

    return {
      status: 'ok',
      service: 'WeDevArt API',
      version: '0.1',
      database: dbStatus,
      uptime: uptimeString.trim(),
      time: new Date().toISOString(),
    };
  }
}
