# Déploiement FINGEC sur VPS Hostinger (Docker + Caddy)

Migration du site **fingec.fr** depuis l'hébergement mutualisé vers le VPS.
L'app Next.js a besoin d'un serveur Node permanent (API contact, newsletter,
chatbot, RSS, emails) : le mutualisé ne peut pas la faire tourner.

## Contexte du VPS (187.124.43.100)

Le VPS héberge déjà d'autres projets :
- **Caddy** (conteneur `pharmaclick-caddy`) est le **seul** à occuper les ports
  80/443. Il fait reverse proxy + SSL automatique (Let's Encrypt).
- `app.fingec.fr` → app existante (`fingec-frontend` / `fingec-backend`). **Ne pas y toucher.**
- Tous les conteneurs partagent le réseau Docker **`pharmaclick_web`** ; Caddy
  les joint par leur nom (pas de port publié).

➡️ On se greffe sur ce Caddy : notre conteneur `fingec-site` rejoint le réseau
partagé, et on ajoute un bloc `fingec.fr` au Caddyfile. **On n'installe PAS Nginx**
(conflit 80/443 avec Caddy).

## 1. Accès SSH

Clé de déploiement : `~/.ssh/fingec_deploy` (déjà autorisée sur le VPS).

```bash
ssh -i ~/.ssh/fingec_deploy root@187.124.43.100
```

## 2. Récupérer le code

> Docker et git sont déjà installés sur le VPS.
> On utilise `/opt/fingec-site` (le dossier `/opt/fingec` est pris par app.fingec.fr).

```bash
git clone <URL_DU_DEPOT> /opt/fingec-site
cd /opt/fingec-site
```

## 3. Variables d'environnement

```bash
cp .env.example .env
nano .env        # NEXT_PUBLIC_BASE_URL=https://fingec.fr + SMTP, MAPBOX, OPENAI...
```

## 4. Lancer le conteneur

Le `docker-compose.yml` rejoint automatiquement le réseau `pharmaclick_web` et
expose le port 3000 (sans le publier).

```bash
docker compose up -d --build
docker ps | grep fingec-site          # doit etre "Up"
```

## 5. Router fingec.fr via Caddy

Ajouter ce bloc au Caddyfile existant `/opt/pharmaclick/Caddyfile` :

```caddy
fingec.fr, www.fingec.fr {
    encode gzip zstd

    handle {
        reverse_proxy fingec-site:3000
    }

    log {
        output stdout
        format json
    }
}
```

Puis recharger Caddy (sans coupure) :

```bash
docker exec pharmaclick-caddy caddy reload --config /etc/caddy/Caddyfile
```

⚠️ Caddy n'obtiendra le certificat SSL de fingec.fr **qu'une fois le DNS pointé
vers le VPS** (étape 6). Tant que ce n'est pas fait, le bloc peut rester en place :
il s'activera automatiquement dès la propagation.

## 6. Bascule DNS (hPanel Hostinger → Zone DNS de fingec.fr)

À faire **après** avoir vérifié que le conteneur tourne. Modifier la **racine**
(ne pas toucher à `app`, `MX`, `ftp`) :

| Enregistrement actuel | Remplacer par |
|---|---|
| `ALIAS` `@` → `fingec.fr.cdn.hstgr.net` | `A` `@` → `187.124.43.100` |
| `CNAME` `www` → `www.fingec.fr.cdn.hstgr.net` | `A` `www` → `187.124.43.100` |

+ désactiver le **CDN Hostinger** sur le domaine. Baisser le TTL à 300 facilite
la propagation. Le site mutualisé reste en ligne tant que le DNS n'est pas changé.

## 7. Mises à jour

```bash
cd /opt/fingec-site && git pull && docker compose up -d --build
```

## Base de données (plus tard)

La newsletter n'est pas encore en prod. Le moment venu : décommenter le service
`db` dans `docker-compose.yml`, mettre `DB_HOST=db` + identifiants dans `.env`,
puis importer `database/newsletter_schema.sql`.
