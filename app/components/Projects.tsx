"use client";

import { useState } from 'react';
import styles from './projects.module.css';
import { 
  FaServer, 
  FaCloud, 
  FaShieldAlt, 
  FaCodeBranch, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaMusic, 
  FaTooth, 
  FaBrain,
  FaChevronDown,
  FaChevronUp,
  FaCoins,
  FaLock,
  FaDatabase,
  FaChartLine
} from 'react-icons/fa';

interface Project {
  title: string;
  category?: string;
  description: string;
  metric?: string;
  githubUrl?: string;
  liveUrl?: string;
  tech: string[];
  icon: typeof FaCloud;
  color: string;
}

const projects: Project[] = [
  // --- FIRST 2 ROWS (DevOps & Cloud Heavy Infrastructure) ---
  {
    title: 'Highly Available ECS & Multi-Stack Containerization',
    category: 'Cloud Architecture & Containerization',
    description: 'Engineered end-to-end CI/CD workflows using Bitbucket Pipelines and AWS CodePipeline. Containerized diverse, high-traffic web applications (React, Node.js, NestJS, Python) using multi-stage Docker builds (45% image reduction) and deployed them onto highly scalable, fault-tolerant AWS ECS clusters with automated rolling rollouts.',
    metric: '99.98% uptime • Multi-stage Docker builds • Zero-downtime canary rollouts',
    tech: ['Docker', 'AWS ECS', 'Terraform', 'Ansible', 'Bitbucket Pipelines', 'AWS CodePipeline', 'Node.js', 'Python'],
    icon: FaCloud,
    color: '#0052CC' // Bitbucket blue
  },
  {
    title: 'Production AWS Infrastructure (Terraform & CloudFormation)',
    category: 'Infrastructure as Code',
    description: 'Developed reusable, production-grade Infrastructure as Code modules using Terraform and AWS CloudFormation. Authored comprehensive architectural documentation and end-to-end topology diagrams detailing every service across the app ecosystem—including multi-AZ VPC networking, ALBs, ECS/EC2 compute, relational and cache databases (RDS & Redis), and unified Datadog APM/log observability pipelines.',
    metric: '100% codified IaC • Full ecosystem diagrams & architectural documentation',
    githubUrl: 'https://github.com/zugger14/infrastructure-terraform',
    tech: ['Terraform', 'CloudFormation', 'AWS', 'VPC', 'RDS', 'Datadog', 'Architecture Diagrams'],
    icon: FaCloud,
    color: '#326CE5' // blue
  },
  {
    title: 'Ansible Multi-App Server Automation',
    category: 'Configuration Management',
    description: 'Production-grade, 100% DRY Ansible automation suite to provision AWS EC2 hosts, allocate persistent swapfiles, configure Docker daemon, and deploy multiple dockerized web apps behind dynamic Nginx virtual hosts.',
    metric: 'Single-command server provisioning & multi-app deployment',
    githubUrl: 'https://github.com/zugger14/infrastructure-ansible',
    tech: ['Ansible', 'AWS EC2', 'Docker Compose', 'Nginx Reverse Proxy', 'Linux'],
    icon: FaServer,
    color: '#EE0000' // Ansible Red
  },
  {
    title: 'Automated Observability & Visual Reporting',
    category: 'Monitoring & SRE Automation',
    description: 'Architected Datadog & CloudWatch observability with an automated reporting engine built using Python and Playwright. The headless service captures live snapshot renders of infrastructure metrics dashboards, evaluates SLA thresholds, generates PDF/HTML health reports, and provides AI-driven remediation suggestions for performance bottlenecks.',
    metric: 'Automated visual metric snapshots • Proactive bottleneck suggestions',
    tech: ['Python', 'Playwright', 'Datadog', 'CloudWatch', 'APM', 'Synthetic Testing'],
    icon: FaChartLine,
    color: '#00D1FF' // light blue
  },
  {
    title: 'AWS Cloud Cost Optimization & FinOps',
    category: 'FinOps & Cost Engineering',
    description: 'Implemented automated AWS cost optimization routines using EventBridge scheduled triggers, Lambda, and Boto3—including compute rightsizing, Graviton instance migrations, S3 Intelligent-Tiering, ECR image lifecycle pruning policies, automated EBS snapshot cleanup, and scheduled non-production environment shutdowns.',
    metric: '35%+ monthly cloud bill reduction • Automated idle resource & container image cleanup',
    tech: ['AWS Cost Explorer', 'EventBridge', 'Lambda', 'Python Boto3', 'AWS Budgets', 'ECR Lifecycle', 'S3 Lifecycle', 'Terraform'],
    icon: FaCoins,
    color: '#FFD700' // gold
  },
  {
    title: 'AWS Cloud Security Hardening & Compliance',
    category: 'Cloud Security & DevSecOps',
    description: 'Enforced defense-in-depth AWS security baselines aligned with the AWS Well-Architected Framework and SOC2. Configured AWS IAM least-privilege policies with SCPs, enabled AWS WAF with rate-limiting, AWS GuardDuty, Security Hub, KMS encryption at rest, and automated vulnerability scanning in CI/CD.',
    metric: 'Zero critical findings in audit • 100% encrypted at rest & in transit',
    tech: ['AWS IAM', 'AWS WAF', 'GuardDuty', 'Security Hub', 'KMS', 'Trivy', 'SOC2'],
    icon: FaLock,
    color: '#FF4136' // red security
  },

  // --- FIRST ROW OF "SHOW MORE" (Full-Stack & Containerized Web Apps) ---
  {
    title: 'MindFlow – AI Cognitive Dashboard',
    category: 'Full-Stack & Cloud Deployment',
    description: 'An AI-powered cognitive health and productivity application featuring ultradian focus rhythm timers, CBT reframing journals, Box Breathing guidance, and Google Gemini AI insights. Containerized with Docker and deployed via automated GitHub Actions CI/CD to AWS EC2.',
    metric: 'Dockerized • Automated CI/CD to AWS EC2 • Gemini AI Integrated',
    githubUrl: 'https://github.com/zugger14/mindflow',
    tech: ['React 19', 'Vite', 'Gemini AI', 'TailwindCSS', 'Docker', 'AWS EC2', 'GitHub Actions'],
    icon: FaBrain,
    color: '#00E5FF' // vivid cyan
  },
  {
    title: 'MusicBook – Streaming & Social Platform',
    category: 'Media Architecture & Real-Time',
    description: 'A full-stack social network and music streaming marketplace with byte-range HTTP 206 audio playback, real-time messaging via Socket.IO & Redis Pub/Sub, PayPal checkout, and YouTube live streaming. Dockerized multi-service architecture running on AWS ECS and EC2 behind Nginx reverse proxy.',
    metric: 'HTTP 206 Byte Streaming • Real-Time WebSockets • ECS & EC2',
    githubUrl: 'https://github.com/zugger14/musicbook',
    tech: ['Laravel', 'Vue.js', 'Node.js', 'Socket.IO', 'Redis', 'Docker', 'AWS ECS', 'Nginx'],
    icon: FaMusic,
    color: '#FF007F' // vibrant magenta
  },
  {
    title: 'AMS – Clinic & Appointment Management',
    category: 'Enterprise Cloud System',
    description: 'A high-reliability clinic and appointment management system managing multi-tenant clinics, dentists, patients, appointments, and medical reporting. Engineered with MariaDB automated seeding, multi-environment Docker containers, and automated AWS ECR build & rolling restart ECS pipelines.',
    metric: 'Automated ECR Pipeline • Zero-Downtime ECS Rolling Deployments',
    githubUrl: 'https://github.com/zugger14/ams',
    tech: ['PHP', 'MariaDB', 'Docker Compose', 'AWS ECR', 'AWS ECS', 'GitHub Actions', 'Nginx'],
    icon: FaTooth,
    color: '#00FFC8' // mint emerald
  },

  // --- SUBSEQUENT PROJECTS IN "SHOW MORE" ---
  {
    title: 'Serverless CI/CD Pipelines (AWS SAM)',
    category: 'Serverless & CI/CD Automation',
    description: 'Built and optimized comprehensive GitLab CI/CD pipelines to automate the packaging, testing, and deployment of highly scalable serverless AWS SAM applications and Lambda functions.',
    metric: '60% faster deployment cycle with serverless build caching',
    tech: ['AWS SAM', 'GitLab CI', 'Lambda', 'API Gateway', 'Serverless'],
    icon: FaCodeBranch,
    color: '#FF4500' // orange
  },
  {
    title: 'AWS Backups & Disaster Recovery (DR)',
    category: 'Disaster Recovery & Business Continuity',
    description: 'Architected automated, centralized multi-region disaster recovery (DR) solutions utilizing AWS Backup, cross-region EBS and RDS snapshots, and immutable AWS Backup Vault Locks for ransomware protection with defined RTO/RPO objectives.',
    metric: '< 15-min RPO / < 30-min RTO target • Immutable backup compliance',
    tech: ['AWS Backup', 'RDS Point-in-Time', 'Cross-Region Replication', 'S3 Glacier', 'Terraform'],
    icon: FaDatabase,
    color: '#9B51E0' // purple
  },
  {
    title: 'GenAI Home Lab Infrastructure',
    category: 'AI & Systems Engineering',
    description: 'Built a personal GPU server infrastructure for local LLMs and multi-modal GenAI pipelines. Developed n8n automation workflows to generate, edit, and automatically post Stable Diffusion AI content to websites and social media.',
    metric: '4x faster throughput • Self-hosted local inference',
    tech: ['GPU Servers', 'n8n', 'Stable Diffusion', 'Automation'],
    icon: FaServer,
    color: '#FFB300' // yellow
  },
  {
    title: 'Zero-Downtime Migration',
    category: 'Cloud Migration & Systems',
    description: 'Executed zero-downtime automated DNS migrations to AWS Route 53 using custom Python scripts with boto3, and managed a fleet of ~100 servers using Ansible for centralized configuration.',
    metric: 'Zero downtime during cutover • 100+ nodes under Ansible fleet control',
    tech: ['Python', 'Boto3', 'AWS Route 53', 'Ansible', 'Docker', 'Kubernetes'],
    icon: FaShieldAlt,
    color: '#00FFC8' // cyan
  },
  {
    title: 'Centralized Log Management',
    category: 'Observability & Logging',
    description: 'Centralized system logs across distributed environments by deploying an ELK Stack, significantly enhancing visibility and deep debugging capabilities.',
    metric: 'Sub-second search across multi-server audit & error logs',
    tech: ['ELK Stack', 'Elasticsearch', 'Kibana', 'Logging'],
    icon: FaCloud,
    color: '#FF007F' // pink
  },
  {
    title: 'Enterprise VCS Migration & Azure DevOps CI/CD',
    category: 'Enterprise Migration & Automation',
    description: 'Orchestrated an enterprise migration of ~150 repositories from SVN to Git, standardized branching strategies, and configured robust Azure Pipelines to automate builds and deployments for business-critical PHP and MS SQL applications.',
    metric: '150+ repos migrated • Replaced manual FTP/RDP with automated release gates',
    tech: ['Azure Pipelines', 'Git', 'SVN', 'PHP', 'MS SQL', 'CI/CD'],
    icon: FaCodeBranch,
    color: '#0078D4' // azure blue
  },
  {
    title: 'Chatbot Automation',
    category: 'Workflow Automation',
    description: 'Developed a custom Node.js Zoom chatbot to automate real-time product release notifications for cross-functional teams, streamlining release communications.',
    metric: 'Instant release notification across team channels',
    tech: ['Node.js', 'Zoom API', 'Automation', 'JS'],
    icon: FaCodeBranch,
    color: '#39FF14' // neon green
  }
];

export default function Projects() {
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const isExpanded = visibleCount >= projects.length;
  const visibleProjects = projects.slice(0, visibleCount);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT);
      // Smooth scroll back to top of projects section if scrolled down
      const section = document.getElementById('projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setVisibleCount(projects.length);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Featured <span className={styles.highlight}>Projects</span></h2>
      <p className={styles.sectionSubtitle}>
        Production architectures, containerized applications, and DevOps automation workflows.
      </p>

      <div className={styles.grid}>
        {visibleProjects.map((project, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                <project.icon size={26} />
              </div>
              <div className={styles.headerLinks}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                    title="Live Demo"
                  >
                    <FaExternalLinkAlt size={16} />
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.cardLink}
                    title="View Repository / Code"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
              </div>
            </div>

            {project.category && (
              <span className={styles.categoryTag}>{project.category}</span>
            )}
            
            <h3 className={styles.cardTitle}>{project.title}</h3>
            
            {project.metric && (
              <div className={styles.metricBadge}>
                <span className={styles.metricDot} />
                <span>{project.metric}</span>
              </div>
            )}

            <p className={styles.cardDesc}>{project.description}</p>
            <div className={styles.techStack}>
              {project.tech.map((tech, i) => (
                <span key={i} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.loadMoreContainer}>
        <button 
          className={styles.loadMoreBtn} 
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              Show Less <FaChevronUp style={{ marginLeft: '8px' }} />
            </>
          ) : (
            <>
              Show More Projects ({projects.length - visibleCount} more) <FaChevronDown style={{ marginLeft: '8px' }} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
