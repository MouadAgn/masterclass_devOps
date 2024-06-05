# Utiliser une image de base
FROM ubuntu:latest

# Installer les dépendances nécessaires
RUN apt-get update && \
    apt-get install -y apache2 php libapache2-mod-php php-mysql

# Copier les fichiers du projet dans le conteneur
COPY . /var/www/html/

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Démarrer Apache en mode premier plan
CMD ["apachectl", "-D", "FOREGROUND"]
