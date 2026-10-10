import Image from 'next/image';
import styles from './hero.module.css';
import { SiGitlab, SiJenkins, SiDocker, SiKubernetes, SiPrometheus } from 'react-icons/si';
import { FaAws, FaArrowRight } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Floating Tech Stack Icons in Glassmorphic Boxes */}
      <div className={styles.iconContainer}>
        <div className={styles.glassIcon}><SiGitlab /></div>
        <div className={styles.glassIcon}><SiJenkins /></div>
        <div className={styles.glassIcon}><SiKubernetes /></div>
        <div className={styles.glassIcon}><FaAws /></div>
        <div className={styles.glassIcon}><SiDocker /></div>
        <div className={styles.glassIcon}><SiPrometheus /></div>
      </div>

      <div className={styles.content}>
        <div className={styles.preTitle}>Shirish Maharjan —</div>
        <h1 className={styles.mainTitle}>DEVOPS & AI INTELLIGENCE</h1>
        
        <div className={styles.avatarContainer}>
          <div className={styles.avatarRing} />
          <div className={styles.avatarInner} title="Shirish Maharjan">
            <Image
              src="/profile.jpg"
              alt="Shirish Maharjan"
              width={160}
              height={160}
              priority
              className={styles.avatarImg}
            />
          </div>
        </div>

        <p className={styles.subtitle}>
          Designing, automating, and scaling cloud-native architectures. Integrating AI assistants and MCP servers to build high-productivity workflows.
        </p>
        
        <a href="#projects" className={styles.ctaButton}>
          VIEW PROJECTS <FaArrowRight style={{marginLeft: '8px'}} />
        </a>
      </div>
    </section>
  );
}
