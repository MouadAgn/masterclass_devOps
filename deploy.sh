#!/bin/bash

# Construire l'image Docker
docker build -t projet-jpo .

# Arrêter et supprimer le conteneur existant s'il y en a un
docker stop projet-jpo-container || true
docker rm projet-jpo-container || true

# Lancer un nouveau conteneur
docker run -d -p 80:80 --name projet-jpo-container projet-jpo
