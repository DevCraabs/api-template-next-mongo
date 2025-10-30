#!/bin/bash
# ───────────────────────────────────────────────
# Script : dev-reset.sh
# Reset complet de l'environnement (Mongo, volumes, Nest)
# ───────────────────────────────────────────────

CYAN='\033[1;36m'
RESET='\033[0m'

echo -e "${CYAN}[RESET] 🧹 Arrêt et suppression des conteneurs + volumes...${RESET}"
docker compose down -v

echo -e "${CYAN}[RESET] 🧱 Relance propre de Docker Compose...${RESET}"
docker compose up -d

echo -e "${CYAN}[RESET] ⏳ Attente de 5 secondes...${RESET}"
sleep 5

echo -e "${CYAN}[RESET] 🚀 Redémarrage de NestJS...${RESET}"
npm run start:dev
