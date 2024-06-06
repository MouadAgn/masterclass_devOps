# Utiliser une image de base Ubuntu
FROM ubuntu:latest

# Mettre à jour les paquets et installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    && apt-get clean

# Copier les fichiers du projet dans le répertoire par défaut de l'apache
COPY . /var/www/html/

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Démarrer Apache en mode détaché
CMD ["apachectl", "-D", "FOREGROUND"]