#!/bin/bash
# ───────────────────────────────────────────────
# Script : stop.sh
# Stoppe proprement Docker
# ───────────────────────────────────────────────

CYAN='\033[1;36m'
RESET='\033[0m'
echo -e "${CYAN}[STOP] 🛑 Arrêt des conteneurs Docker...${RESET}"

docker compose down
echo -e "${CYAN}[STOP] ✅ Docker arrêté.${RESET}"
