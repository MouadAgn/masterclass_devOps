# Utiliser une image Ubuntu comme base
FROM ubuntu:latest

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    php-xml \
    && apt-get clean

# Copier le projet dans le conteneur
COPY . /var/www/html/

# Donner les bonnes permissions aux fichiers
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Exposer le port 80
EXPOSE 80

# Démarrer Apache
CMD ["apachectl", "-D", "FOREGROUND"]
