#!/usr/bin/env bash
set -e

echo "============================================="
echo "   Setting up EC2 for DevOps Portfolio App   "
echo "============================================="

# 1. Update system packages
echo "==> Updating apt repositories..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Install prerequisites, Git, Docker, and Nginx
echo "==> Installing Git, Docker, and Nginx..."
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    nginx \
    certbot \
    python3-certbot-nginx

# 3. Install Docker Engine and Docker Compose Plugin
if ! command -v docker &> /dev/null; then
    echo "==> Setting up official Docker repository..."
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

# 4. Enable Docker for non-root user
echo "==> Adding current user ($USER) to docker group..."
sudo usermod -aG docker "$USER"
sudo systemctl enable docker
sudo systemctl start docker

# 5. Configure Nginx Reverse Proxy
echo "==> Configuring Nginx reverse proxy..."
sudo tee /etc/nginx/sites-available/portfolio > /dev/null << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site and disable default site
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t && sudo systemctl restart nginx

echo "============================================="
echo "  EC2 Setup Complete!                        "
echo "  1. Run: newgrp docker                      "
echo "  2. Point your domain's DNS to this EC2 IP  "
echo "  3. (Optional) Run: sudo certbot --nginx    "
echo "============================================="
