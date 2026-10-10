import HeroSection from "./components/HeroSection";
import CicdDemo from "./components/CicdDemo";
import SkillRadar from "./components/SkillRadar";
import BinaryCanvas from "./components/BinaryCanvas";
import heroStyles from "./components/hero.module.css";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      {/* Global Background Elements */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <BinaryCanvas />
      </div>
      <div className={heroStyles.networkLines} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <section id="home">
          <HeroSection />
        </section>
        <section id="projects" style={{ padding: '4rem 1rem' }}>
          <Projects />
        </section>
        <section id="live-demo" style={{ padding: '4rem 1rem' }}>
          <CicdDemo />
        </section>
        <section id="skillset" style={{ paddingTop: '4rem', paddingRight: '1rem', paddingBottom: '4rem', paddingLeft: '1rem' }}>
          <SkillRadar />
        </section>
        <section id="contact" style={{ padding: '4rem 1rem', paddingBottom: '8rem' }}>
          <Contact />
        </section>
      </main>
    </div>
  );
}
