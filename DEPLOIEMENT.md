# Déploiement FINGEC sur VPS Hostinger (Docker)

Migration depuis l'hébergement mutualisé vers le VPS. L'app Next.js a besoin
d'un serveur Node permanent (API contact, newsletter, chatbot, RSS, emails) :
le mutualisé ne peut pas la faire tourner, d'où le passage au VPS.

## 1. Accès SSH au VPS

La clé de déploiement existe déjà sur cette machine : `~/.ssh/fingec_deploy`.
Clé publique à enregistrer sur le VPS (panneau Hostinger > SSH Keys, ou) :

```bash
ssh-copy-id -i ~/.ssh/fingec_deploy.pub root@IP_DU_VPS
```

Connexion :

```bash
ssh -i ~/.ssh/fingec_deploy root@IP_DU_VPS
```

## 2. Préparer le VPS (une seule fois)

```bash
# Docker + Docker Compose
curl -fsSL https://get.docker.com | sh
# Git
apt-get update && apt-get install -y git
```

## 3. Récupérer le code

```bash
git clone <URL_DU_DEPOT> /opt/fingec
cd /opt/fingec
```

## 4. Configurer les variables d'environnement

```bash
cp .env.example .env
nano .env        # renseigner SMTP, FROM_EMAIL, MAPBOX, OPENAI, etc.
```

## 5. Lancer l'application

```bash
docker compose up -d --build
```

L'app écoute sur le port **3000** du VPS.
Test : `curl http://localhost:3000`

## 6. Nginx + HTTPS (domaine fingec.fr)

Une fois le DNS de fingec.fr pointé vers l'IP du VPS :

```bash
apt-get install -y nginx certbot python3-certbot-nginx
```

Reverse proxy `/etc/nginx/sites-available/fingec` :

```nginx
server {
    server_name fingec.fr www.fingec.fr;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/fingec /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d fingec.fr -d www.fingec.fr   # SSL Let's Encrypt auto
```

## 7. Mises à jour

```bash
cd /opt/fingec && git pull && docker compose up -d --build
```

## Base de données (plus tard)

La newsletter n'est pas encore en prod. Quand ce sera le cas :
1. Décommenter le service `db` dans `docker-compose.yml` (+ le volume).
2. Mettre `DB_HOST=db` et les identifiants dans `.env`.
3. Importer le schéma :
   ```bash
   docker compose up -d db
   docker compose exec -T db mysql -u root -p < database/newsletter_schema.sql
   ```
