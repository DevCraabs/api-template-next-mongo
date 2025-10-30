#!/bin/bash
# ───────────────────────────────────────────────
# Script : dev.sh
# Lancement WeDevArt | Docker + NestJS
# ───────────────────────────────────────────────

# Couleurs (anthracite + doré)
GOLD='\033[1;33m'
GRAY='\033[1;30m'
WHITE='\033[1;37m'
RESET='\033[0m'

# ───── Informations dynamiques ─────
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
CURRENT_DATE=$(date "+%d/%m/%Y %H:%M")

# ───── ASCII BANNER ─────
echo -e "\n${GOLD}"
cat << "EOF"
 __      __       ________                _____          __   
/  \    /  \ ____ \______ \   _______  __/  _  \________/  |_ 
\   \/\/   // __ \ |    |  \_/ __ \  \/ /  /_\  \_  __ \   __\
 \        /\  ___/ |    `   \  ___/\   /    |    \  | \/|  |  
  \__/\  /  \___  >_______  /\___  >\_/\____|__  /__|   |__|  
       \/       \/        \/     \/            \/             
EOF
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}"
echo -e "${GOLD}💡 WeDevArt Dev Environment  |  ${WHITE}${CURRENT_DATE}${GOLD}  |  Branch: ${WHITE}${CURRENT_BRANCH}${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"

# ───── Étape 1 : Lancement Docker ─────
echo -e "${WHITE}[1/3] ${GOLD}🐳 Lancement de Docker Compose...${RESET}"
docker compose up -d
if [ $? -ne 0 ]; then
  echo -e "❌ ${WHITE}Docker n'a pas pu démarrer. Vérifie le daemon.${RESET}"
  exit 1
fi

# ───── Étape 2 : Attente Mongo ─────
echo -e "${WHITE}[2/3] ${GOLD}⏳ Attente de 5 secondes pour initialiser Mongo...${RESET}"
sleep 5

# ───── Étape 3 : Lancement NestJS ─────
echo -e "${WHITE}[3/3] ${GOLD}🧠 Démarrage du serveur NestJS (watch mode)...${RESET}\n"
npm run start:dev

# ───── Fin ─────
echo -e "\n${GRAY}──────────────────────────────────────────────────────────────${RESET}"
echo -e "${GOLD}✅ WeDevArt | Session terminée avec succès.${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"
