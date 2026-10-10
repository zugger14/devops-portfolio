"use client";

import { useState } from 'react';
import styles from './projects.module.css';
import { FaServer, FaCloud, FaShieldAlt, FaCodeBranch } from 'react-icons/fa';

const projects = [
  {
    title: 'Highly Available ECS & CI/CD',
    description: 'Engineered end-to-end CI/CD workflows using Bitbucket Pipelines and AWS CodePipeline. Leveraged Terraform for IaC and Ansible for server configuration to deploy applications onto a highly available AWS ECS cluster.',
    tech: ['Terraform', 'Ansible', 'AWS ECS', 'Bitbucket Pipelines', 'AWS CodePipeline'],
    icon: FaCloud,
    color: '#0052CC' // Bitbucket blue
  },
  {
    title: 'GenAI Home Lab Infrastructure',
    description: 'Built a personal GPU server infrastructure for local LLMs and multi-modal GenAI pipelines. Developed n8n automation workflows to generate, edit, and automatically post Stable Diffusion AI content to websites and social media.',
    tech: ['GPU Servers', 'n8n', 'Stable Diffusion', 'Automation'],
    icon: FaServer,
    color: '#FFB300' // yellow
  },
  {
    title: 'Production AWS Infrastructure (IaC)',
    description: 'Developed robust Terraform modules to provision highly available, production-grade AWS architectures, including multi-AZ VPCs, ALB configurations, and NAT Gateways.',
    tech: ['Terraform', 'AWS', 'VPC', 'ALB'],
    icon: FaCloud,
    color: '#326CE5' // blue
  },
  {
    title: 'Full-Stack Observability',
    description: 'Architected observability workflows using Datadog (APM, metrics, logs) and authored reusable Terraform modules. Integrated them directly into CI/CD pipelines for automated APM metrics validation and Datadog browser tests.',
    tech: ['Datadog', 'Terraform', 'CI/CD', 'Browser Tests'],
    icon: FaCloud,
    color: '#00D1FF' // light blue
  },
  {
    title: 'AWS CloudFormation Automation',
    description: 'Engineered and managed scalable cloud infrastructure leveraging Infrastructure as Code via advanced AWS CloudFormation templates.',
    tech: ['CloudFormation', 'AWS', 'IaC', 'Automation'],
    icon: FaCodeBranch,
    color: '#FF4500' // orange
  },
  {
    title: 'Zero-Downtime Migration',
    description: 'Executed zero-downtime automated DNS migrations to AWS Route 53 and managed a fleet of ~100 servers using Ansible for centralized configuration.',
    tech: ['Ansible', 'AWS Route 53', 'Docker', 'Kubernetes'],
    icon: FaShieldAlt,
    color: '#00FFC8' // cyan
  },
  {
    title: 'Serverless CI/CD Pipelines',
    description: 'Built and optimized comprehensive GitLab CI/CD pipelines for automating the deployment of highly scalable serverless AWS SAM infrastructures.',
    tech: ['GitLab CI', 'AWS SAM', 'Serverless', 'CloudFormation'],
    icon: FaCodeBranch,
    color: '#FF4500' // orange
  },
  {
    title: 'Multi-Stack Containerization',
    description: 'Containerized diverse, high-traffic web applications (React, Node.js, NestJS, Python) using Docker and deployed onto highly scalable AWS ECS clusters.',
    tech: ['Docker', 'AWS ECS', 'Python', 'Node.js'],
    icon: FaServer,
    color: '#00D1FF' // light blue
  },
  {
    title: 'Centralized Log Management',
    description: 'Centralized system logs across distributed environments by deploying an ELK Stack, significantly enhancing visibility and deep debugging capabilities.',
    tech: ['ELK Stack', 'Elasticsearch', 'Kibana', 'Logging'],
    icon: FaCloud,
    color: '#FF007F' // pink
  },
  {
    title: 'Enterprise VCS Migration',
    description: 'Orchestrated an enterprise-wide migration of over 150 repositories from SVN to Git, enabling modern collaborative workflows and automated CI/CD pipelines.',
    tech: ['Git', 'SVN', 'Azure Pipelines', 'CI/CD'],
    icon: FaCodeBranch,
    color: '#B200FF' // purple
  },
  {
    title: 'Chatbot Automation',
    description: 'Developed a custom Node.js Zoom chatbot to automate real-time product release notifications for cross-functional teams, streamlining release communications.',
    tech: ['Node.js', 'Zoom API', 'Automation', 'JS'],
    icon: FaCodeBranch,
    color: '#39FF14' // neon green
  },
  {
    title: 'Legacy Azure Automation',
    description: 'Configured robust Azure Pipelines to automate seamless builds and deployments for business-critical legacy PHP and MS SQL applications.',
    tech: ['Azure Pipelines', 'PHP', 'MS SQL', 'CI/CD'],
    icon: FaServer,
    color: '#0078D4' // azure blue
  }
];

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Featured <span className={styles.highlight}>Projects</span></h2>
      <div className={styles.grid}>
        {visibleProjects.map((project, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper} style={{ backgroundColor: `${project.color}20`, color: project.color }}>
              <project.icon size={28} />
            </div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            <div className={styles.techStack}>
              {project.tech.map((tech, i) => (
                <span key={i} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < projects.length && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn} onClick={() => setVisibleCount(prev => prev + 6)}>
            Show More Projects
          </button>
        </div>
      )}
    </div>
  );
}
