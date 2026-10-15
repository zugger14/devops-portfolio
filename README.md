# DevOps & Cloud-Native Engineering Portfolio

Interactive DevOps portfolio showcasing automated delivery workflows, containerized architectures, and cloud deployments.

## 🚀 Live Demo & Architecture

- **Live Site**: [http://34.229.18.255](http://34.229.18.255)
- **Tech Stack**: Next.js 16 (React 19), Docker, Docker Compose, Nginx, AWS EC2, GitHub Actions.

## 🛠️ Features

- **GitOps Pipeline**: Automated testing, linting, multi-stage Docker image builds, and automated SSH-based EC2 deployments on push to `main`.
- **Infrastructure**: Standalone Next.js containerized build behind Nginx reverse proxy on AWS EC2 (Amazon Linux 2023).

## 💻 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🐳 Docker Production Build

```bash
docker compose up --build -d
```
