"use client";

import { useState, useRef } from 'react';

const skills = [
  { name: 'Infrastructure', value: 95, details: 'AWS (EC2, ECS, S3, VPC, IAM, Route 53, Lambda) and Azure cloud architectures.' },
  { name: 'IaC & Automation', value: 90, details: 'Terraform, Ansible, and CloudFormation for scalable, reproducible infrastructure as code.' },
  { name: 'CI/CD Pipelines', value: 95, details: 'GitHub Actions, AWS CodePipeline (CodeBuild, CodeDeploy), GitLab CI/CD, Bitbucket Pipelines, and Azure Pipelines.' },
  { name: 'Observability', value: 85, details: 'Datadog, Prometheus, Grafana, ELK Stack, and New Relic for full-stack monitoring.' },
  { name: 'Containers', value: 100, details: 'Docker and Kubernetes (EKS/ECS) orchestration for highly scalable microservices.' },
  { name: 'AI & Intelligence', value: 90, details: 'Cursor AI, GitHub Copilot, and MCP Server integrations to maximize developer workflows.' }
];

export default function SkillRadar() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt limits
    setRotateY(x * 0.05);
    setRotateX(-y * 0.05);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHoveredSkill(null);
  };

  // Radar chart SVG generation
  const size = 350;
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / skills.length;

  const getPoint = (index: number, value: number) => {
    const r = (value / 100) * radius;
    const x = Math.round(center + r * Math.sin(index * angleStep));
    const y = Math.round(center - r * Math.cos(index * angleStep));
    return `${x},${y}`;
  };

  const polygonPoints = skills.map((s, i) => getPoint(i, s.value)).join(' ');
  const outerPolygonPoints = skills.map((_, i) => getPoint(i, 100)).join(' ');
  const midPolygonPoints = skills.map((_, i) => getPoint(i, 50)).join(' ');

  const activeData = hoveredSkill !== null ? skills[hoveredSkill] : null;

  return (
    <div 
      style={{
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '3rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        perspective: '1000px'
      }}
    >
      <h2 style={{ color: 'rgb(var(--color-primary))', fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>
        Skill Mapping
      </h2>
      <p style={{ color: '#aaa', marginBottom: '3rem', textAlign: 'center', fontSize: '1.1rem' }}>
        Hover over the radar points to explore my technical proficiencies and specific toolsets.
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* RADAR CHART */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out',
            transformStyle: 'preserve-3d',
            position: 'relative',
            cursor: 'crosshair'
          }}
        >
          <svg width={size} height={size} style={{ filter: 'drop-shadow(0 0 20px rgba(var(--color-primary), 0.2))', overflow: 'visible' }}>
            {/* Web/Grid */}
            <polygon points={outerPolygonPoints} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <polygon points={midPolygonPoints} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* Axis lines */}
            {skills.map((_, i) => {
              const dest = getPoint(i, 100).split(',');
              return (
                <line 
                  key={`line-${i}`} 
                  x1={center} y1={center} 
                  x2={dest[0]} y2={dest[1]} 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="1" 
                />
              );
            })}

            {/* Skill Polygon */}
            <polygon 
              points={polygonPoints} 
              fill="rgba(var(--color-primary), 0.2)" 
              stroke="rgb(var(--color-primary))" 
              strokeWidth="2" 
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Data Points and Labels */}
            {skills.map((skill, i) => {
              const pt = getPoint(i, skill.value).split(',');
              const labelPt = getPoint(i, 120).split(','); // Pushed label out slightly
              const isHovered = hoveredSkill === i;
              
              return (
                <g 
                  key={`pt-${i}`} 
                  onMouseEnter={() => setHoveredSkill(i)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                  <circle 
                    cx={pt[0]} 
                    cy={pt[1]} 
                    r={isHovered ? "8" : "5"} 
                    fill={isHovered ? "rgb(var(--color-accent))" : "rgb(var(--color-primary))"} 
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  
                  {/* Invisible larger circle for easier hovering */}
                  <circle 
                    cx={pt[0]} 
                    cy={pt[1]} 
                    r="25" 
                    fill="transparent" 
                  />

                  <text 
                    x={labelPt[0]} 
                    y={labelPt[1]} 
                    fill={isHovered ? "rgb(var(--color-accent))" : "#fff"} 
                    fontSize={isHovered ? "16" : "13"} 
                    fontWeight={isHovered ? "bold" : "normal"}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ 
                      transition: 'all 0.3s ease', 
                      textShadow: isHovered ? '0 0 15px rgba(var(--color-accent), 0.8)' : 'none' 
                    }}
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* INFO PANEL */}
        <div style={{
          width: '340px',
          height: '260px',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
        }}>
          {activeData ? (
            <div key={activeData.name} style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'rgb(var(--color-accent))', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {activeData.name}
                </h3>
                <span style={{ 
                  background: 'rgba(var(--color-accent), 0.15)', 
                  color: 'rgb(var(--color-accent))',
                  border: '1px solid rgba(var(--color-accent), 0.3)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  {activeData.value}/100
                </span>
              </div>
              
              {/* Progress bar visual */}
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                 <div style={{ 
                   width: `${activeData.value}%`, 
                   height: '100%', 
                   background: 'rgb(var(--color-accent))', 
                   borderRadius: '2px',
                   boxShadow: '0 0 15px rgb(var(--color-accent))',
                   transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                 }} />
              </div>
              
              <p style={{ color: '#e0e0e0', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>
                {activeData.details}
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#666', animation: 'fadeIn 0.3s ease-out' }}>
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }}>
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="12" y1="16" x2="12" y2="12"></line>
                 <line x1="12" y1="8" x2="12.01" y2="8"></line>
               </svg>
               <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>Interact with the radar points to reveal detailed technology stacks and proficiency metrics.</p>
            </div>
          )}
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(5px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}
