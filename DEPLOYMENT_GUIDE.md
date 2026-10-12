# Multi-App Infrastructure & Deployment Guide
### DevOps Portfolio, AMS (Appointment Management System), and MusicBook on AWS EC2

This guide documents the complete multi-container infrastructure running simultaneously on a single AWS EC2 `t3.micro` instance with Nginx reverse proxy routing and independent GitHub Actions CI/CD pipelines.

---

## 🏗️ Multi-Application Architecture

```
                                 Internet / Client
                                         │
                                         ▼
                      AWS EC2 (34.229.18.255 - t3.micro)
                                         │
             ┌───────────────────────────┴───────────────────────────┐
             │               Nginx Host Reverse Proxy                │
             │           (/etc/nginx/conf.d/*.conf)                  │
             └──────┬────────────────────┬────────────────────┬──────┘
                    │                    │                    │
        (Port 80 / Default)     (Subdomain ams.*        (Subdomain musicbook.*
         or portfolio.*)          or Port 8080)           or Port 8000)
                    │                    │                    │
                    ▼                    ▼                    ▼
          ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
          │ devops-portfolio │ │     ams-web      │ │  musicbook-app   │
          │  (Next.js 16)    │ │ (CodeIgniter PHP)│ │  (Laravel 5.5)   │
          │  127.0.0.1:3000  │ │  127.0.0.1:8081  │ │  127.0.0.1:8001  │
          └──────────────────┘ └────────┬─────────┘ └────────┬─────────┘
                                        │                    │
                                        ▼                    ├─► musicbook-db (MariaDB 10.6)
                                   ams-db (MariaDB 10.4)     ├─► musicbook-redis (Redis Alpine)
                                   (initdb auto-seeded)      └─► musicbook-socket (Node.js 14 / Port 8890)
```

---

## 🌐 Live URLs & Access

| Application | Routing Method | Live URL | Backend Port |
| :--- | :--- | :--- | :--- |
| **DevOps Portfolio** | Default Host / Port 80 | [http://34.229.18.255/](http://34.229.18.255/) | `127.0.0.1:3000` |
| **AMS** | Subdomain on Port 80 | [http://ams.34.229.18.255.nip.io/](http://ams.34.229.18.255.nip.io/) | `127.0.0.1:8081` |
| **AMS** | Direct Port | [http://34.229.18.255:8080/](http://34.229.18.255:8080/) | `127.0.0.1:8081` |
| **MusicBook** | Subdomain on Port 80 | [http://musicbook.34.229.18.255.nip.io/](http://musicbook.34.229.18.255.nip.io/) | `127.0.0.1:8001` |
| **MusicBook** | Direct Port | [http://34.229.18.255:8000/](http://34.229.18.255:8000/) | `127.0.0.1:8001` |

> [!NOTE]
> `nip.io` provides wildcard DNS resolution mapped directly to the EC2 IP (`34.229.18.255`) without requiring custom DNS purchases. Any custom domain (e.g. `ams.yourdomain.com`) also matches automatically due to the regex server name `~^ams\..*$` and `~^musicbook\..*$`.

---

## ⚙️ Nginx Reverse Proxy Setup (`/etc/nginx/conf.d/`)

### 1. `portfolio.conf` (`/etc/nginx/default.d/portfolio.conf`)
- Acts as default upstream for Port 80.
- Proxies requests to Next.js on `http://127.0.0.1:3000`.

### 2. `ams.conf` (`/etc/nginx/conf.d/ams.conf`)
- Matches `server_name ~^ams\..*$;` on Port 80 and listens on Port 8080.
- Proxies requests to `http://127.0.0.1:8081`.
- Max body upload: 50MB.

### 3. `musicbook.conf` (`/etc/nginx/conf.d/musicbook.conf`)
- Matches `server_name ~^musicbook\..*$;` on Port 80 and listens on Port 8000.
- Proxies web requests to Laravel on `http://127.0.0.1:8001`.
- Proxies `/socket.io/` WebSocket connections to Node.js server on `http://127.0.0.1:8890`.
- Max body upload: 100MB.

---

## ⚡ Memory Optimization for `t3.micro` (1 GB RAM + 2 GB Swap)

Running 7 simultaneous containers on 1 GB physical memory was achieved by tuning each database engine:
- **MariaDB (AMS)**: `--innodb-buffer-pool-size=48M --performance-schema=OFF --key-buffer-size=16M --max-connections=30` (~60 MB RAM)
- **MariaDB (MusicBook)**: `--innodb-buffer-pool-size=64M --performance-schema=OFF --key-buffer-size=16M --max-connections=30` (~75 MB RAM)
- **Total system memory usage across all 7 containers**: ~460 MB used, leaving ample headroom and avoiding swap thrashing.

---

## 🚀 GitHub Actions CI/CD Pipelines

All three repositories feature automated GitHub Actions workflows running on push to `main`:

| Repository | Workflow File | Secrets Configured | Deploy Mechanism |
| :--- | :--- | :--- | :--- |
| `zugger14/devops-portfolio` | [`.github/workflows/deploy.yml`](../devops-portfolio/.github/workflows/deploy.yml) | `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` | Node 22 build, SSH checkout, `docker compose up --build -d` |
| `zugger14/ams` | [`.github/workflows/deploy.yml`](../ams/.github/workflows/deploy.yml) | `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` | PHP syntax validation, SSH pull, `docker compose up --build -d` |
| `zugger14/musicbook` | [`.github/workflows/deploy.yml`](../musicbook/.github/workflows/deploy.yml) | `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` | PHP syntax validation, SSH pull, `docker compose up --build -d` |
