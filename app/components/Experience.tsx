"use client";

import styles from './experience.module.css';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface WorkItem {
  role: string;
  company: string;
  location: string;
  period: string;
  duties: string[];
  tech: string[];
}

const workExperience: WorkItem[] = [
  {
    role: 'DevOps & Software Intelligence Engineer',
    company: 'Social Knowledge (RVLIFE)',
    location: 'USA (Contract)',
    period: 'Apr 2025 — Present',
    duties: [
      'Architected full-stack observability workflows using Datadog across APM, infrastructure metrics, and logs for fast resolution.',
      'Authored reusable Terraform modules for AWS/Datadog, slashing environment deployment times by 70% with strict reproducibility.',
      'Pioneered integration of AI assistants (Cursor AI, GitHub Copilot) and MCP servers to maximize developer velocity.',
      'Engineered automated, zero-downtime CI/CD pipelines using GitHub Actions and AWS CodePipeline.'
    ],
    tech: ['AWS', 'Datadog', 'Terraform', 'GitHub Actions', 'AWS CodePipeline', 'Cursor AI', 'MCP Servers', 'APM']
  },
  {
    role: 'DevOps Engineer',
    company: 'EBPearls',
    location: 'Nepal',
    period: 'Jan 2024 — Mar 2025',
    duties: [
      'Containerized high-traffic React, Node.js, NestJS, and Python apps using Docker to optimize environment consistency.',
      'Automated software delivery pipelines with Bitbucket Pipelines and AWS CodePipeline, cutting deploy times to minutes.',
      'Utilized Ansible and Terraform for server provisioning, reducing manual configuration errors by 90%.',
      'Established robust real-time monitoring infrastructures leveraging Nagios, New Relic, Prometheus, and Grafana.',
      'Developed a custom Node.js Zoom chatbot to automate real-time product release notifications for cross-functional teams.'
    ],
    tech: ['Docker', 'AWS CodePipeline', 'Bitbucket Pipelines', 'Ansible', 'Terraform', 'Prometheus', 'Grafana', 'Nagios', 'New Relic', 'Node.js']
  },
  {
    role: 'DevOps Engineer',
    company: 'Hitachi Energy',
    location: 'Nepal',
    period: 'Jan 2023 — Jul 2023',
    duties: [
      'Orchestrated enterprise migration of ~150 repositories from SVN to Git, enabling modern collaborative workflows.',
      'Standardized branching strategies and version control across teams through targeted developer training sessions.',
      'Configured Azure Pipelines to automate builds and deployments for critical PHP and MS SQL applications.'
    ],
    tech: ['Git', 'SVN Migration', 'Azure Pipelines', 'PHP', 'MS SQL', 'Branching Strategy']
  },
  {
    role: 'DevOps Engineer',
    company: 'Legalfit',
    location: 'USA (Contract)',
    period: 'Aug 2021 — Dec 2022',
    duties: [
      'Managed a fleet of ~100 servers using Ansible to ensure seamless, centralized configuration management.',
      'Successfully executed a zero-downtime automated DNS migration to AWS Route 53.',
      'Deployed and orchestrated highly available, auto-scaling environments on Docker and Kubernetes.',
      'Implemented security baselines aligned with the AWS Well-Architected Framework and SOC2 compliance controls.'
    ],
    tech: ['Ansible', 'AWS Route 53', 'Kubernetes', 'Docker', 'AWS Well-Architected', 'SOC2 Compliance']
  },
  {
    role: 'DevOps Engineer',
    company: 'Cloudyfox',
    location: 'Nepal',
    period: 'May 2020 — Aug 2021',
    duties: [
      'Containerized multi-stack applications and deployed them onto highly scalable AWS ECS clusters using Docker.',
      'Built GitLab CI/CD pipelines optimized for serverless AWS SAM infrastructure deployments.',
      'Managed scalable cloud infrastructure leveraging infrastructure as code via Terraform and AWS CloudFormation.',
      'Centralized system logs by deploying an ELK Stack to enhance visibility and deep debugging capabilities.'
    ],
    tech: ['AWS ECS', 'Docker', 'GitLab CI', 'AWS SAM', 'Terraform', 'CloudFormation', 'ELK Stack']
  }
];

export default function Experience() {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Professional <span className={styles.highlight}>Experience</span>
      </h2>
      <p className={styles.subtitle}>
        6+ years designing, automating, and scaling cloud-native architectures and production platforms.
      </p>

      {/* Career Timeline */}
      <div className={styles.timeline}>
        {workExperience.map((item, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <h3 className={styles.timelineRole}>{item.role}</h3>
                <span className={styles.timelinePeriod}>
                  <FaCalendarAlt size={12} />
                  {item.period}
                </span>
              </div>
              <div className={styles.companyInfoRow}>
                <span className={styles.timelineCompany}>{item.company}</span>
                <span className={styles.timelineLocation}>
                  <FaMapMarkerAlt size={11} style={{ marginRight: '4px' }} />
                  {item.location}
                </span>
              </div>
              <ul className={styles.timelineDuties}>
                {item.duties.map((duty, dIdx) => (
                  <li key={dIdx}>{duty}</li>
                ))}
              </ul>
              <div className={styles.timelineTech}>
                {item.tech.map((t, tIdx) => (
                  <span key={tIdx} className={styles.timelineTechBadge}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
