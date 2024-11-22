#Documentation du Projet Pokedex: CI/CD Pipeline
##Introduction
Le projet Pokedex est une application web dynamique développée avec React et TypeScript, conçue pour permettre aux utilisateurs d'explorer, de rechercher et d'afficher des informations détaillées sur les Pokémon. Un pipeline d'intégration continue et de déploiement continu (CI/CD) est intégré pour optimiser le processus de développement, garantir la qualité du code et automatiser le déploiement de l'application.

##Objectifs du Pipeline CI/CD
Le pipeline CI/CD joue un rôle crucial dans le cycle de vie du développement de l'application, en se concentrant sur les aspects suivants :

##Contrôle de Qualité du Code
Assure que tout le code soumis respecte les standards de qualité définis et adhère aux meilleures pratiques.
Tests Automatisés
Exécute une gamme complète de tests, incluant les tests d'intégration et end-to-end, pour confirmer que l'application fonctionne correctement dans divers scénarios.
Construction et Déploiement
Compile l'application et la déploie automatiquement vers les environnements de staging ou de production, facilitant des mises à jour fluides et rapides.
Guide d'Utilisation des Tests Locaux
Pour exécuter les tests et les vérifications de code en local, les commandes suivantes sont recommandées :

```bash

# Clonage du dépôt
actions/checkout@v4

# Configuration de Node.js (v20) et activation du cache npm
actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

# Installation des dépendances
npm ci

# Vérification du respect des conventions TypeScript
npx tsc --noEmit

# Vérification du formatage avec Prettier
npx prettier --check .

# Analyse du code avec ESLint
npx eslint .

# Lancement des tests avec Cypress
npx cypress open

# Compilation du projet
npm run build
Configuration du Pipeline CI
La configuration du pipeline CI est définie dans le fichier ci.yml, activé par des événements de push ou pull_request. Il comprend les étapes suivantes :

yaml


name: CI

on: [push, pull_request]

jobs:
  CI:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npx prettier --check .

      - run: npx eslint .

      - run: npm run build

      - run: echo "Tout est bon"

      # Configuration pour le déploiement via SSH
      - uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SERVEUR_POKEMON_MATHYS }}

      - run: ssh-keyscan -H serveur_ip >> ~/.ssh/known_hosts

      - run: ssh user@serveur_ip "commande"
```

Cette configuration illustre le processus complet, de la vérification du code à la construction de l'application, jusqu'au déploiement final. Elle assure un développement fluide et une maintenance aisée de l'application.