# DevOps Portfolio - Deployment & Infrastructure Guide

Complete record of the infrastructure setup, automated CI/CD pipeline, server configurations, and maintenance guidelines.

---

## 🏗️ Architecture

```
Developer Local Machine
       │
       ▼ (git push origin main)
GitHub Actions (Runner: ubuntu-latest)
       ├─► Job 1: Test & Build Validation (Node 22, npm run lint, npm run build)
       └─► Job 2: Deploy to AWS EC2 via SSH (appleboy/ssh-action)
                   │
                   ▼ (SSH: 34.229.18.255)
AWS EC2 Instance (t3.micro - Amazon Linux 2023)
       ├─► 2 GB Swap Memory Active (/swapfile)
       ├─► Nginx Reverse Proxy (Port 80 -> http://127.0.0.1:3000)
       └─► Docker Compose (Next.js 16 Standalone Container: devops-portfolio:3000)
```

---

## 📁 Files Created & Modified

| File | Change | Description |
| :--- | :--- | :--- |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | Added | CI/CD workflow triggering automated validation & SSH deployment on push to `main`. |
| [`Dockerfile`](Dockerfile) | Created & Optimized | Multi-stage build (`node:20-alpine`) with `NODE_OPTIONS="--max-old-space-size=768"` for `t3.micro` stability. |
| [`docker-compose.yml`](docker-compose.yml) | Added | Manages `devops-portfolio` container with `restart: always` on port `3000`. |
| [`.dockerignore`](.dockerignore) | Added | Keeps Docker context lean by ignoring `node_modules`, `.next`, and logs. |
| [`next.config.ts`](next.config.ts) | Modified | Enabled `output: 'standalone'` for lightweight container image generation. |
| [`app/components/CicdDemo.tsx`](app/components/CicdDemo.tsx) | Added | Interactive dual-pane GitOps simulator with live sandbox iframe. |

---

## 🖥️ AWS EC2 Configuration (`34.229.18.255`)

- **Instance**: `i-0a633431a60818a79` (`shirish-webserver`, `t3.micro`, Amazon Linux 2023).
- **Swap Memory**: 2 GB swapfile configured at `/swapfile` (persisted in `/etc/fstab`) to allow Next.js build tools to compile without OOM crashing the 1 GB VM.
- **Docker & Build Engine**: Docker service enabled (`systemctl enable --now docker`); Buildx upgraded to v0.38 for compatibility with modern Docker Compose.
- **Nginx Reverse Proxy**: Configured at `/etc/nginx/default.d/portfolio.conf` forwarding port 80 to `http://127.0.0.1:3000`.

---

## 🔑 GitHub Repository Secrets

Configured on `zugger14/devops-portfolio`:
- `EC2_HOST`: `34.229.18.255`
- `EC2_USER`: `ec2-user`
- `EC2_SSH_KEY`: Content of `shirish-webserver.pem`

---

## ⚠️ Important Action Items For You

1. **Rotate AWS Credentials (URGENT)**:
   - The AWS Access Key (`AKIAY63AYR...`) and Secret Access Key entered earlier in chat should be rotated in the AWS IAM Console immediately. Deactivate and delete the old key, then create a new one.
2. **Assign an Elastic IP (Recommended)**:
   - `34.229.18.255` is currently a dynamic public IP. If the instance is stopped/started, AWS changes this IP.
   - Allocate an Elastic IP in the AWS EC2 console, associate it with `shirish-webserver`, and update `EC2_HOST` secret if the IP changes (`gh secret set EC2_HOST --body "<new_ip>"`).
3. **Domain & HTTPS (Optional)**:
   - When pointing a domain, create an A record to your IP and run:
     ```bash
     sudo dnf install -y python3-certbot-nginx
     sudo certbot --nginx -d yourdomain.com
     ```

---

## 🛠️ Handy Commands

```bash
# SSH into EC2
ssh -i /path/to/shirish-webserver.pem ec2-user@34.229.18.255

# View live container logs
docker logs -f devops-portfolio

# Check memory status
free -m

# Manually trigger GitHub Actions deployment
gh workflow run deploy.yml --ref main
```
