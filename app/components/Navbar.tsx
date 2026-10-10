"use client";

import Link from 'next/link';
import { FaHome, FaLayerGroup, FaWrench, FaPen, FaEnvelope, FaGithub, FaTerminal } from 'react-icons/fa';
import styles from './navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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
        
        <div className={styles.navLinks}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`${styles.navLink} ${styles.active}`}>
            <FaHome className={styles.navLinkIcon} />
            <span>Home</span>
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={styles.navLink}>
            <FaLayerGroup className={styles.navLinkIcon} />
            <span>Projects</span>
          </a>
          <a href="#skillset" onClick={(e) => handleNavClick(e, 'skillset')} className={styles.navLink}>
            <FaWrench className={styles.navLinkIcon} />
            <span>Skillset</span>
          </a>
          <a href="#blog" onClick={(e) => handleNavClick(e, 'blog')} className={styles.navLink}>
            <FaPen className={styles.navLinkIcon} />
            <span>Blog</span>
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={styles.navLink}>
            <FaEnvelope className={styles.navLinkIcon} />
            <span>Contact</span>
          </a>
        </div>

        <div className={styles.navActions}>
          <ThemeToggle />
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.githubIcon}>
            <FaGithub />
          </a>
          <Link href="/contact" className={styles.ctaButton}>
            GET IN TOUCH
          </Link>
        </div>
      </nav>
    </div>
  );
}
