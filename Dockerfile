FROM php:apache

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# pour copier les fichiers du projet
COPY . /var/www/html/ 

# WORKDIR /var/www/html/
# RUN composer install

# RUN ./vendor/bin/phpunit --bootstrap vendor/autoload.php Tests > log.txt || true
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y sudo \
    && apt-get clean
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN sudo apt-get install -y npm
RUN node -v
RUN npm -v


EXPOSE 80

CMD ["apache2-foreground"]