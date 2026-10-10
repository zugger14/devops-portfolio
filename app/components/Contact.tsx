import styles from './contact.module.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Get In <span className={styles.highlight}>Touch</span></h2>
      <p className={styles.subtitle}>Open for opportunities and collaborations.</p>
      
      <div className={styles.cardContainer}>
        <a href="mailto:shirishmaharjan0@gmail.com" className={styles.contactCard}>
          <div className={styles.iconWrapper}><FaEnvelope size={24} /></div>
          <div className={styles.info}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>shirishmaharjan0@gmail.com</span>
          </div>
        </a>

        <a href="tel:+9779803341626" className={styles.contactCard}>
          <div className={styles.iconWrapper}><FaPhone size={24} /></div>
          <div className={styles.info}>
            <span className={styles.label}>Phone</span>
            <span className={styles.value}>+977-9803341626</span>
          </div>
        </a>

        <a href="https://linkedin.com/in/shirish14/" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
          <div className={styles.iconWrapper}><FaLinkedin size={24} /></div>
          <div className={styles.info}>
            <span className={styles.label}>LinkedIn</span>
            <span className={styles.value}>linkedin.com/in/shirish14</span>
          </div>
        </a>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}><FaMapMarkerAlt size={24} /></div>
          <div className={styles.info}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>Kathmandu, Nepal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
