#!/bin/bash
cd /opt/wilderness
docker compose stop nginx
docker run --rm -p 80:80 \
  -v /opt/wilderness/certbot/conf:/etc/letsencrypt \
  -v /opt/wilderness/certbot/www:/var/www/certbot \
  certbot/certbot renew --standalone
docker compose up -d nginx
