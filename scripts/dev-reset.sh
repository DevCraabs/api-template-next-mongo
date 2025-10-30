#!/bin/bash
# ───────────────────────────────────────────────
# Script : dev-reset.sh
# Réinitialisation complète de l'environnement WeDevArt
# ───────────────────────────────────────────────

# Couleurs (anthracite + doré)
GOLD='\033[1;33m'
GRAY='\033[1;30m'
WHITE='\033[1;37m'
RESET='\033[0m'

# Infos dynamiques
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
echo -e "${GOLD}💡 WeDevArt Dev Reset  |  ${WHITE}${CURRENT_DATE}${GOLD}  |  Branch: ${WHITE}${CURRENT_BRANCH}${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"

# ───── Étape 1 : Arrêt et suppression des conteneurs + volumes ─────
echo -e "${WHITE}[1/3] ${GOLD}🧹 Suppression complète des conteneurs et volumes Docker...${RESET}"
docker compose down -v
if [ $? -ne 0 ]; then
  echo -e "❌ ${WHITE}Échec lors de la suppression des conteneurs. Vérifie Docker.${RESET}"
  exit 1
fi

# ───── Étape 2 : Relance propre de Docker ─────
echo -e "${WHITE}[2/3] ${GOLD}🐳 Relance des conteneurs Docker...${RESET}"
docker compose up -d
if [ $? -ne 0 ]; then
  echo -e "❌ ${WHITE}Docker n'a pas pu redémarrer.${RESET}"
  exit 1
fi

echo -e "${WHITE}⏳ Attente de 5 secondes pour initialisation de Mongo...${RESET}"
sleep 5

# ───── Étape 3 : Redémarrage du serveur NestJS ─────
echo -e "${WHITE}[3/3] ${GOLD}🧠 Démarrage du serveur NestJS (watch mode)...${RESET}\n"
npm run start:dev

# ───── Fin ─────
echo -e "\n${GRAY}──────────────────────────────────────────────────────────────${RESET}"
echo -e "${GOLD}✅ WeDevArt Reset | Environnement propre et prêt à coder.${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"
