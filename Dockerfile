FROM php:apache

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# pour copier les fichiers du projet
COPY . /var/www/html/ 

# WORKDIR /var/www/html/
# RUN composer install

# RUN ./vendor/bin/phpunit --bootstrap vendor/autoload.php Tests > log.txt || true

EXPOSE 80

CMD ["apache2-foreground"]