FROM php:8.1-apache

RUN apt-get update && \
    apt-get install -y \
    libpq-dev \
    unzip \
    && \
    docker-php-ext-install \
    pdo \
    pdo_pgsql \
    && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY . .
RUN composer clear-cache

RUN composer install --optimize-autoloader && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache
RUN composer self-update

RUN composer require nunomaduro/collision
RUN composer require nesbot/carbon

# RUN pecl install redis && docker-php-ext-enable redis

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
