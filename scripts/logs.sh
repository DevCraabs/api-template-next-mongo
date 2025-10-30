#!/bin/bash
# ───────────────────────────────────────────────
# Script : logs.sh
# Affiche les logs Docker ou NestJS
# ───────────────────────────────────────────────

CYAN='\033[1;36m'
RESET='\033[0m'

case $1 in
  docker)
    echo -e "${CYAN}[LOGS] 🐳 Logs Docker Compose...${RESET}"
    docker compose logs -f
    ;;
  nest)
    echo -e "${CYAN}[LOGS] 🧠 Logs NestJS (npm run start:dev)...${RESET}"
    npm run start:dev
    ;;
  *)
    echo "Usage: bash scripts/logs.sh [docker|nest]"
    ;;
esac
