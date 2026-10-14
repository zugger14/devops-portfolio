"use client";

import { useState, FormEvent } from 'react';
import styles from './contact.module.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Construct mailto as instant zero-friction handler or fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:shirishmaharjan0@gmail.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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

        {/* Quick Send Message Form */}
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>Send a Direct Message</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
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
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className={styles.textarea}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {submitted ? (
                <>
                  <FaCheckCircle color="#00ffc8" />
                  <span>Message Sent!</span>
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
