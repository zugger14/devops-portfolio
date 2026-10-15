"use client";

import styles from './experience.module.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

interface WorkItem {
  company: string;
  role: string;
  location: string;
  period: string;
}

const workExperience: WorkItem[] = [
  {
    company: 'Social Knowledge (RVLIFE)',
    role: 'DevOps & Software Intelligence Engineer',
    location: 'USA (Contract)',
    period: 'Apr 2025 — Present'
  },
  {
    company: 'EBPearls',
    role: 'DevOps Engineer',
    location: 'Nepal',
    period: 'Jan 2024 — Mar 2025'
  },
  {
    company: 'Hitachi Energy',
    role: 'DevOps Engineer',
    location: 'Nepal',
    period: 'Jan 2023 — Jul 2023'
  },
  {
    company: 'Legalfit',
    role: 'DevOps Engineer',
    location: 'USA (Contract)',
    period: 'Aug 2021 — Dec 2022'
  },
  {
    company: 'Cloudyfox',
    role: 'DevOps Engineer',
    location: 'Nepal',
    period: 'May 2020 — Aug 2021'
  }
];

export default function Experience() {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Professional <span className={styles.highlight}>Experience</span>
      </h2>
      <p className={styles.subtitle}>
        6+ years designing, automating, and scaling cloud-native architectures across global teams.
      </p>

      {/* Career Timeline */}
      <div className={styles.timeline}>
        {workExperience.map((item, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <h3 className={styles.companyName}>
                  <FaBuilding className={styles.companyIcon} />
                  {item.company}
                </h3>
                <span className={styles.timelinePeriod}>
                  <FaCalendarAlt size={12} />
                  {item.period}
                </span>
              </div>
              <div className={styles.companyInfoRow}>
                <span className={styles.timelineRole}>{item.role}</span>
                <span className={styles.timelineLocation}>
                  <FaMapMarkerAlt size={11} style={{ marginRight: '5px' }} />
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
