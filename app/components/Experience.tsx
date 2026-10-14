"use client";

import styles from './experience.module.css';
import { FaAws, FaCalendarAlt, FaCheckCircle, FaAward } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiDocker, SiLinux } from 'react-icons/si';

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    icon: FaAws,
    color: '#FF9900',
    status: 'Verified'
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    icon: SiTerraform,
    color: '#844FBA',
    status: 'Proficient'
  },
  {
    name: 'Kubernetes Administrator & CKA Practice',
    issuer: 'Cloud Native Computing Foundation',
    icon: SiKubernetes,
    color: '#326CE5',
    status: 'Trained'
  },
  {
    name: 'Enterprise Linux & Container Security',
    issuer: 'Linux Foundation / Red Hat',
    icon: SiLinux,
    color: '#00FFC8',
    status: 'Hands-on'
  }
];

const workExperience = [
  {
    role: 'Senior DevOps & Cloud Infrastructure Engineer',
    company: 'Enterprise Cloud Solutions / High-Traffic Platforms',
    period: '2023 — Present',
    duties: [
      'Architected and deployed AWS ECS and EKS cluster environments with automated multi-AZ failover and auto-scaling triggers.',
      'Authored modular Terraform IaC modules and Ansible playbooks to provision and govern 100+ cloud and on-premise compute nodes.',
      'Designed end-to-end GitOps CI/CD delivery pipelines reducing lead time to production from hours to sub-10-minute automated rollouts.',
      'Integrated Datadog APM, synthetics, and distributed tracing directly into deployment gates for continuous latency and error monitoring.'
    ],
    tech: ['AWS', 'Kubernetes', 'Terraform', 'Datadog', 'Ansible', 'GitLab CI', 'Docker']
  },
  {
    role: 'DevOps & Systems Automation Engineer',
    company: 'Cloud Infrastructure & Engineering Services',
    period: '2021 — 2023',
    duties: [
      'Executed full enterprise migration of 150+ code repositories from SVN to Git with zero disruption to active sprint cycles.',
      'Built multi-stage Docker container build workflows cutting container image sizes by ~45% and eliminating CVE vulnerabilities.',
      'Orchestrated automated DNS migrations onto AWS Route 53 with zero downtime for high-volume customer portals.',
      'Administered centralized logging infrastructure leveraging Elasticsearch, Logstash, and Kibana (ELK) with automated alerting.'
    ],
    tech: ['Docker', 'AWS Route 53', 'ELK Stack', 'Azure Pipelines', 'Ansible', 'Python']
  },
  {
    role: 'Systems & Infrastructure Specialist',
    company: 'Software & Network Engineering',
    period: '2019 — 2021',
    duties: [
      'Automated legacy deployment pipelines with Azure DevOps and shell scripts for business-critical PHP and SQL database services.',
      'Developed custom operational chatbots (Zoom API / Slack) for instant build notifications and incident escalation.',
      'Maintained Linux server security posture, firewall rules, automated SSL certificate renewals, and system backups.'
    ],
    tech: ['Linux', 'Shell Scripting', 'Azure DevOps', 'Node.js', 'Nginx', 'MySQL']
  }
];

export default function Experience() {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Experience &amp; <span className={styles.highlight}>Credentials</span>
      </h2>
      <p className={styles.subtitle}>
        Proven industry track record building, scaling, and safeguarding cloud-native platforms.
      </p>

      {/* Certifications Showcase */}
      <div className={styles.certificationsGrid}>
        {certifications.map((cert, index) => (
          <div key={index} className={styles.certCard}>
            <div 
              className={styles.certIconWrapper} 
              style={{ background: `${cert.color}15`, color: cert.color }}
            >
              <cert.icon size={26} />
            </div>
            <div className={styles.certInfo}>
              <span className={styles.certName}>{cert.name}</span>
              <span className={styles.certIssuer}>{cert.issuer}</span>
              <span className={styles.certStatus} style={{ color: cert.color }}>
                ✓ {cert.status}
              </span>
            </div>
          </div>
        ))}
      </div>

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
              <div className={styles.timelineCompany}>{item.company}</div>
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
