#!/usr/bin/env sh

if [ "$CI" == "true" ]; then
  exit 0
fi

green="\033[32m"
yellow="\033[33m"
red="\033[31m"
gray="\033[30m"
reset="\033[0m"

if [[ -f ".husky/_/husky.sh" ]]; then
    echo -e "${green}✓${reset} husky  🐶"
else
    echo -e "${red}✗${reset} husky"
    husky install
    echo -e "${green}✓${reset} husky  🐶"
fi   

chmod +x .husky/*

if (pnpm list -g turbo | grep -q turbo) || (npm ls -g turbo | grep -q turbo); then
    echo -e "${green}✓${reset} turbo  🛞"
else
    echo -e "${red}✗${reset} turbo"
    echo -e "  ${gray}you should run ${yellow}pnpm i -g turbo${reset}"
fi
