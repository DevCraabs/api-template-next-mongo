#!/bin/bash
# ───────────────────────────────────────────────
# Script : setup.sh
# Installation et configuration initiale
# ───────────────────────────────────────────────

CYAN='\033[1;36m'
RESET='\033[0m'

echo -e "${CYAN}[SETUP] 🧩 Installation des dépendances NPM...${RESET}"
npm install

echo -e "${CYAN}[SETUP] 🔧 Vérification Docker...${RESET}"
if ! command -v docker &> /dev/null; then
  echo "❌ Docker n'est pas installé. Installe-le avant de continuer."
  exit 1
fi

echo -e "${CYAN}[SETUP] 🔐 Attribution des droits Docker...${RESET}"
sudo usermod -aG docker $USER

echo -e "${CYAN}[SETUP] ✅ Setup terminé. Tu peux lancer : npm run dev:full${RESET}"
