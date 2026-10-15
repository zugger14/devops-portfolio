"use client";

import { useState, FormEvent } from 'react';
import styles from './contact.module.css';
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaSpinner 
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message || "Thank you! Your message has been sent directly. Shirish will get back to you shortly.",
        });
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to send message. Please try again or reach out directly on LinkedIn.',
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Network error sending your message. Please check your connection or reach out directly on LinkedIn.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Get In <span className={styles.highlight}>Touch</span></h2>
      <p className={styles.subtitle}>Open for consulting, enterprise cloud architecture, and full-time opportunities.</p>
      
      <div className={styles.contactWrapper}>
        {/* Contact Info Cards */}
        <div className={styles.cardContainer}>
          <a href="mailto:shirishmaharjan0@gmail.com" className={styles.contactCard}>
            <div className={styles.iconWrapper}><FaEnvelope size={22} /></div>
            <div className={styles.info}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>shirishmaharjan0@gmail.com</span>
            </div>
          </a>

          <a href="tel:+9779803341626" className={styles.contactCard}>
            <div className={styles.iconWrapper}><FaPhone size={22} /></div>
            <div className={styles.info}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>+977-9803341626</span>
            </div>
          </a>

          <a href="https://linkedin.com/in/shirish14/" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
            <div className={styles.iconWrapper}><FaLinkedin size={22} /></div>
            <div className={styles.info}>
              <span className={styles.label}>LinkedIn</span>
              <span className={styles.value}>linkedin.com/in/shirish14</span>
            </div>
          </a>

          <div className={styles.contactCard}>
            <div className={styles.iconWrapper}><FaMapMarkerAlt size={22} /></div>
            <div className={styles.info}>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>

        {/* Quick Direct Message Form */}
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>Send a Direct Message</h3>
          <p className={styles.formSubtitle}>Send your message directly from here without opening any email client.</p>

          {statusMessage && (
            <div className={statusMessage.type === 'success' ? styles.successAlert : styles.errorAlert} role="alert">
              {statusMessage.type === 'success' ? (
                <FaCheckCircle className={styles.alertIcon} size={18} />
              ) : (
                <FaExclamationTriangle className={styles.alertIcon} size={18} />
              )}
              <div className={styles.alertContent}>
                <span>{statusMessage.text}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Hidden honeypot field for bot protection */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
              style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                disabled={isSubmitting}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                disabled={isSubmitting}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Project details or message..."
                rows={4}
                required
                value={formData.message}
                disabled={isSubmitting}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className={styles.textarea}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className={styles.spinnerIcon} />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
