"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaHome, 
  FaLayerGroup, 
  FaWrench, 
  FaBriefcase, 
  FaEnvelope, 
  FaGithub, 
  FaTerminal, 
  FaFileDownload,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import styles from './navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (!target) return;

    if (!document.startViewTransition) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    document.startViewTransition(() => {
      target.scrollIntoView({ behavior: 'instant' });
    });
  };

  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.brand} style={{textDecoration: 'none'}}>
          <FaTerminal className={styles.brandLogo} />
          <div className={styles.brandName}>
            <span>SHIRISH MAHARJAN</span>
            <span style={{color: 'rgba(255,255,255,0.3)'}}>|</span>
            <span className={styles.brandRole}>DEVOPS</span>
          </div>
        </Link>
        
        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={styles.navLink}>
            <FaHome className={styles.navLinkIcon} />
            <span>Home</span>
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={styles.navLink}>
            <FaLayerGroup className={styles.navLinkIcon} />
            <span>Projects</span>
          </a>
          <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={styles.navLink}>
            <FaBriefcase className={styles.navLinkIcon} />
            <span>Experience</span>
          </a>
          <a href="#skillset" onClick={(e) => handleNavClick(e, 'skillset')} className={styles.navLink}>
            <FaWrench className={styles.navLinkIcon} />
            <span>Skillset</span>
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={styles.navLink}>
            <FaEnvelope className={styles.navLinkIcon} />
            <span>Contact</span>
          </a>
        </div>

        {/* Actions */}
        <div className={styles.navActions}>
          <ThemeToggle />
          <a 
            href="https://github.com/shirish14" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.githubIcon}
            title="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a 
            href="/shirish-maharjan-resume.pdf" 
            download="Shirish_Maharjan_Resume.pdf" 
            className={styles.resumeNavBtn}
            title="Download PDF Resume"
          >
            <FaFileDownload size={12} />
            <span>CV</span>
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')} 
            className={styles.ctaButton}
          >
            GET IN TOUCH
          </a>

          {/* Mobile Menu Button */}
          <button 
            type="button"
            className={styles.mobileMenuBtn} 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={styles.navLink}>
          <FaHome className={styles.navLinkIcon} />
          <span>Home</span>
        </a>
        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={styles.navLink}>
          <FaLayerGroup className={styles.navLinkIcon} />
          <span>Projects</span>
        </a>
        <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={styles.navLink}>
          <FaBriefcase className={styles.navLinkIcon} />
          <span>Experience</span>
        </a>
        <a href="#live-demo" onClick={(e) => handleNavClick(e, 'live-demo')} className={styles.navLink}>
          <FaTerminal className={styles.navLinkIcon} />
          <span>CI/CD Pipeline Demo</span>
        </a>
        <a href="#skillset" onClick={(e) => handleNavClick(e, 'skillset')} className={styles.navLink}>
          <FaWrench className={styles.navLinkIcon} />
          <span>Skillset</span>
        </a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={styles.navLink}>
          <FaEnvelope className={styles.navLinkIcon} />
          <span>Contact</span>
        </a>
      </div>
    </div>
  );
}
