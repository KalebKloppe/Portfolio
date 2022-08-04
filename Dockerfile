FROM php:apache-buster
WORKDIR /
COPY . ./var/www/html/
EXPOSE 80

