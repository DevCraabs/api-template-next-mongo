#!/bin/bash
# ───────────────────────────────────────────────
# Script : stop.sh
# Arrêt propre de l'environnement Docker WeDevArt
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
echo -e "${GOLD}💡 WeDevArt Stop Script  |  ${WHITE}${CURRENT_DATE}${GOLD}  |  Branch: ${WHITE}${CURRENT_BRANCH}${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"

# ───── Étape 1 : Arrêt des conteneurs ─────
echo -e "${WHITE}[1/1] ${GOLD}🛑 Arrêt des conteneurs Docker...${RESET}"
docker compose down
if [ $? -ne 0 ]; then
  echo -e "❌ ${WHITE}Erreur lors de l'arrêt de Docker.${RESET}"
  exit 1
fi

# ───── Fin ─────
echo -e "\n${GRAY}──────────────────────────────────────────────────────────────${RESET}"
echo -e "${GOLD}✅ Tous les conteneurs Docker ont été arrêtés avec succès.${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"

# ───── Message personnalisé ─────
sleep 0.5
echo -e "${GOLD}💬 Goodbye ${WHITE}Craabs${GOLD} 👋 — environment fully stopped.${RESET}"
echo -e "${GRAY}──────────────────────────────────────────────────────────────${RESET}\n"
