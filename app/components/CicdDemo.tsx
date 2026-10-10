"use client";

import { useState, useRef, useEffect, UIEvent, ComponentType } from 'react';
import { 
  FaCodeBranch, 
  FaRocket, 
  FaCheckCircle, 
  FaTerminal, 
  FaLock, 
  FaRedo, 
  FaSync, 
  FaServer, 
  FaShieldAlt,
  FaCheck
} from 'react-icons/fa';
import { SiGithubactions, SiDocker, SiKubernetes } from 'react-icons/si';
import styles from './cicd.module.css';

// Preset Templates
const PRESET_GATEWAY = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d1117;
      color: #e6edf3;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      background: rgba(0, 255, 200, 0.15);
      color: #00ffc8;
      border: 1px solid rgba(0, 255, 200, 0.3);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #00ffc8;
      box-shadow: 0 0 8px #00ffc8;
    }
    h1 {
      font-size: 21px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
    }
    p {
      font-size: 13px;
      color: #8b949e;
      max-width: 280px;
      margin-bottom: 18px;
      line-height: 1.4;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      max-width: 290px;
      margin-bottom: 18px;
    }
    .stat {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 10px;
      text-align: left;
    }
    .label { font-size: 10px; color: #8b949e; text-transform: uppercase; }
    .val { font-size: 16px; font-weight: 700; color: #00ffc8; margin-top: 2px; }
    .btn {
      background: #238636;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover { background: #2ea043; }
  </style>
</head>
<body>
  <div class="badge"><span class="dot"></span> Cluster: Healthy</div>
  <h1>Edge Ingress Gateway</h1>
  <p>Cloud Native Kubernetes service routing traffic with zero packet loss.</p>
  <div class="grid">
    <div class="stat">
      <div class="label">Uptime</div>
      <div class="val">99.99%</div>
    </div>
    <div class="stat">
      <div class="label">P99 Latency</div>
      <div class="val">11 ms</div>
    </div>
  </div>
  <button class="btn" onclick="alert('Container node-eu-1 is responsive! Latency: 9ms')">Ping Health Check</button>
</body>
</html>`;

const PRESET_SECURITY = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0f0b14;
      color: #f0e6ff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      background: rgba(255, 95, 86, 0.15);
      color: #ff5f56;
      border: 1px solid rgba(255, 95, 86, 0.4);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff5f56;
      box-shadow: 0 0 8px #ff5f56;
    }
    h1 {
      font-size: 21px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
    }
    p {
      font-size: 13px;
      color: #bfa8d8;
      max-width: 280px;
      margin-bottom: 18px;
      line-height: 1.4;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      max-width: 290px;
      margin-bottom: 18px;
    }
    .stat {
      background: #1c1429;
      border: 1px solid #4a2870;
      border-radius: 8px;
      padding: 10px;
      text-align: left;
    }
    .label { font-size: 10px; color: #bfa8d8; text-transform: uppercase; }
    .val { font-size: 16px; font-weight: 700; color: #ff5f56; margin-top: 2px; }
    .btn {
      background: #d03050;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover { background: #e04060; }
  </style>
</head>
<body>
  <div class="badge"><span class="dot"></span> Hotfix: WAF Active</div>
  <h1>Security Shield v2.4</h1>
  <p>Automated zero-day mitigation rule deployed across CloudFront and Envoy.</p>
  <div class="grid">
    <div class="stat">
      <div class="label">Blocked Attacks</div>
      <div class="val">4,892</div>
    </div>
    <div class="stat">
      <div class="label">WAF Policy</div>
      <div class="val">Enforced</div>
    </div>
  </div>
  <button class="btn" onclick="alert('WAF Rule 403 active: 0 suspicious packets allowed.')">Verify WAF Rules</button>
</body>
</html>`;

const PRESET_AUTOSCALE = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #06131f;
      color: #e0f2fe;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.4);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
    }
    h1 {
      font-size: 21px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
    }
    p {
      font-size: 13px;
      color: #94a3b8;
      max-width: 280px;
      margin-bottom: 18px;
      line-height: 1.4;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      max-width: 290px;
      margin-bottom: 18px;
    }
    .stat {
      background: #0b2136;
      border: 1px solid #1e3a5f;
      border-radius: 8px;
      padding: 10px;
      text-align: left;
    }
    .label { font-size: 10px; color: #94a3b8; text-transform: uppercase; }
    .val { font-size: 16px; font-weight: 700; color: #38bdf8; margin-top: 2px; }
    .btn {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn:hover { background: #0369a1; }
  </style>
</head>
<body>
  <div class="badge"><span class="dot"></span> Autoscaled: 12 Pods</div>
  <h1>High Throughput Cluster</h1>
  <p>Kubernetes HPA dynamically scaled pods to handle 50k req/sec peak load.</p>
  <div class="grid">
    <div class="stat">
      <div class="label">Replicas</div>
      <div class="val">12 / 12</div>
    </div>
    <div class="stat">
      <div class="label">Throughput</div>
      <div class="val">48.2k rps</div>
    </div>
  </div>
  <button class="btn" onclick="alert('Cluster capacity: 12 nodes running healthy at 34% CPU.')">Inspect Pod Metrics</button>
</body>
</html>`;

interface PipelineStage {
  id: number;
  name: string;
  tool: string;
  icon: ComponentType<{ size?: number; color?: string; className?: string }>;
  color: string;
  summary: string;
}

const pipelineStages: PipelineStage[] = [
  { 
    id: 1, 
    name: 'Git Push & Webhook', 
    tool: 'GitOps Trigger',
    icon: FaCodeBranch, 
    color: '#00FFC8',
    summary: 'Branch origin/main webhook dispatched'
  },
  { 
    id: 2, 
    name: 'Build & Security Scan', 
    tool: 'GitHub Actions',
    icon: SiGithubactions, 
    color: '#FFB300',
    summary: 'Unit tests passed & zero CVEs detected'
  },
  { 
    id: 3, 
    name: 'Container Build', 
    tool: 'Docker Engine',
    icon: SiDocker, 
    color: '#2496ED',
    summary: 'Multi-stage image pushed to registry'
  },
  { 
    id: 4, 
    name: 'Zero-Downtime Deploy', 
    tool: 'Kubernetes Cluster',
    icon: SiKubernetes, 
    color: '#B200FF',
    summary: 'Canary rolling rollout & traffic cutover'
  },
];

interface LogLine {
  time: string;
  tag: string;
  tagColor: string;
  msg: string;
}

export default function CicdDemo() {
  // Code states
  const [draftCode, setDraftCode] = useState<string>(PRESET_GATEWAY);
  const [deployedCode, setDeployedCode] = useState<string>(PRESET_GATEWAY);
  const [activePreset, setActivePreset] = useState<number | null>(1);
  const [commitMsg, setCommitMsg] = useState<string>('feat: update ingress edge service and cluster telemetry');
  
  // Pipeline execution states
  const [activeStep, setActiveStep] = useState<number>(0); // 0 = idle, 1..4 = active, 5 = finished
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [version, setVersion] = useState<string>('1.0.4');
  const [revisionHash, setRevisionHash] = useState<string>('c7a10f8');
  
  // UI interaction states
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);
  const [showDeploySuccess, setShowDeploySuccess] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  
  // Terminal logs state
  const [terminalLogs, setTerminalLogs] = useState<LogLine[]>([
    { time: '05:20:11', tag: 'INIT', tagColor: '#00ffc8', msg: 'GitOps runner agent initialized on k8s-runner-eu1' },
    { time: '05:20:12', tag: 'READY', tagColor: '#58a6ff', msg: 'Listening for webhook triggers on repo: shirish/devops-portfolio' },
    { time: '05:20:12', tag: 'STATUS', tagColor: '#3fb950', msg: 'Production cluster synced with revision rev-c7a10f8 (v1.0.4)' },
  ]);

  // Refs for editor and terminal
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Sync scrolling between textarea and line numbers
  const handleEditorScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Auto-scroll terminal logs to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLogs, isTerminalOpen]);

  const hasChanges = draftCode.trim() !== deployedCode.trim();
  const lineCount = draftCode.split('\n').length;

  const handleSelectPreset = (presetId: number) => {
    if (isRunning) return;
    setActivePreset(presetId);
    if (presetId === 1) {
      setDraftCode(PRESET_GATEWAY);
      setCommitMsg('feat: restore default ingress gateway configuration');
    } else if (presetId === 2) {
      setDraftCode(PRESET_SECURITY);
      setCommitMsg('fix: deploy security WAF rule patch for CVE-2026-991');
    } else if (presetId === 3) {
      setDraftCode(PRESET_AUTOSCALE);
      setCommitMsg('scale: configure HPA cluster autoscale target to 12 pods');
    }
  };

  const handleRefreshIframe = () => {
    setIsReloading(true);
    setIframeKey(prev => prev + 1);
    setTimeout(() => {
      setIsReloading(false);
    }, 600);
  };

  const addLog = (tag: string, tagColor: string, msg: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setTerminalLogs(prev => [...prev, { time: timeStr, tag, tagColor, msg }]);
  };

  const runPipeline = () => {
    if (isRunning || !hasChanges) return;

    setIsRunning(true);
    setShowDeploySuccess(false);
    setIsTerminalOpen(true);
    setActiveStep(1);

    const newCommitHash = Math.random().toString(16).substring(2, 9);
    const stagedCode = draftCode;

    // Increment patch version
    const versionParts = version.split('.');
    const nextVersion = `${versionParts[0]}.${versionParts[1]}.${parseInt(versionParts[2], 10) + 1}`;

    // Clear and start terminal stream
    addLog('GIT', '#00ffc8', `>> git commit -m "${commitMsg || 'chore: automated deployment'}"`);
    addLog('GIT', '#00ffc8', `>> Staged commit hash: rev-${newCommitHash} [origin/main]`);
    addLog('GIT', '#00ffc8', '>> Webhook payload dispatched to CI runner node-01');

    // Stage 2: Build & Test (after 1400ms)
    setTimeout(() => {
      setActiveStep(2);
      addLog('CI', '#FFB300', '>> [Runner] Initializing ephemeral container worker...');
      addLog('CI', '#FFB300', '>> Running: npm run test && npm run lint:check');
      addLog('CI', '#FFB300', '>> PASS tests/ingress.spec.ts (14 tests passed, 0 failures, 11ms)');
      addLog('SEC', '#3fb950', '>> Trivy vulnerability scan: 0 critical, 0 high vulnerabilities found.');
    }, 1400);

    // Stage 3: Container Build (after 2900ms)
    setTimeout(() => {
      setActiveStep(3);
      addLog('DOCKER', '#2496ED', `>> docker buildx build --platform linux/amd64 -t registry.shirish.dev/app:v${nextVersion} .`);
      addLog('DOCKER', '#2496ED', '>> [1/4] FROM node:22-alpine AS builder');
      addLog('DOCKER', '#2496ED', '>> [2/4] COPY package*.json ./ && RUN npm ci --only=production');
      addLog('DOCKER', '#2496ED', `>> [3/4] Layer cached sha256:${newCommitHash}4e8...`);
      addLog('DOCKER', '#2496ED', `>> [4/4] Successfully tagged & pushed to Harbor registry: sha256:${newCommitHash}`);
    }, 2900);

    // Stage 4: Kubernetes Rolling Deployment (after 4400ms)
    setTimeout(() => {
      setActiveStep(4);
      addLog('K8S', '#B200FF', `>> kubectl set image deployment/prod-edge web=registry.shirish.dev/app:v${nextVersion}`);
      addLog('K8S', '#B200FF', '>> Starting canary deployment: 1 of 3 updated pods launching...');
      addLog('K8S', '#B200FF', '>> Readiness probe passed: HTTP 200 OK (latency 12ms)');
      addLog('K8S', '#B200FF', '>> 3/3 pods healthy. Ingress traffic route cutover to 100%.');
    }, 4400);

    // Completion (after 6000ms)
    setTimeout(() => {
      setActiveStep(5);
      setDeployedCode(stagedCode);
      setVersion(nextVersion);
      setRevisionHash(newCommitHash);
      setIframeKey(prev => prev + 1);
      setShowDeploySuccess(true);
      setIsRunning(false);

      addLog('PROD', '#00ffc8', `>> DEPLOYMENT SUCCESSFUL! Revision v${nextVersion} (${newCommitHash}) is LIVE!`);

      // Reset step indicator back to idle after 4 seconds of triumph
      setTimeout(() => {
        setActiveStep(0);
      }, 4000);

      // Hide success notification after 6 seconds
      setTimeout(() => {
        setShowDeploySuccess(false);
      }, 6000);
    }, 6000);
  };

  return (
    <div className={styles.container}>
      {/* Header section */}
      <div className={styles.header}>
        <div className={styles.badgeWrapper}>
          <span className={styles.livePulse} />
          <span className={styles.badgeText}>ENTERPRISE GITOPS &amp; CLOUD ARCHITECTURE</span>
        </div>
        <h2 className={styles.title}>
          Live <span className={styles.highlight}>CI/CD Pipeline</span> Studio
        </h2>
        <p className={styles.subtitle}>
          Interactive GitOps deployment experience. Edit source code on the left, trigger an automated multi-stage pipeline, 
          and watch your code deploy with zero downtime to the real production <span className={styles.highlight}>&lt;iframe&gt;</span> environment on the right.
        </p>
      </div>

      {/* Dual-Pane Studio: Left = IDE, Right = Production Browser Mockup */}
      <div className={styles.studioGrid}>
        {/* Left Column: Developer IDE */}
        <div className={styles.idePanel}>
          <div className={styles.panelHeader}>
            <div className={styles.windowDots}>
              <span className={styles.dot} style={{ background: '#ff5f56' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#27c93f' }} />
            </div>
            
            <div className={styles.fileTab}>
              <FaCodeBranch size={11} color="#00ffc8" />
              <span>service.html</span>
              <span className={styles.gitBranchTag}>main*</span>
            </div>

            <div className={styles.statusIndicator}>
              {hasChanges ? (
                <span className={styles.modifiedBadge}>● 1 uncommitted change</span>
              ) : (
                <span className={styles.cleanBadge}>✓ Working tree clean</span>
              )}
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className={styles.presetsBar}>
            <span className={styles.presetsLabel}>1-Click Presets:</span>
            <button
              type="button"
              className={`${styles.presetBtn} ${activePreset === 1 ? styles.presetActive : ''}`}
              onClick={() => handleSelectPreset(1)}
              disabled={isRunning}
            >
              🌐 Gateway API
            </button>
            <button
              type="button"
              className={`${styles.presetBtn} ${activePreset === 2 ? styles.presetActive : ''}`}
              onClick={() => handleSelectPreset(2)}
              disabled={isRunning}
            >
              🛡️ Security Hotfix
            </button>
            <button
              type="button"
              className={`${styles.presetBtn} ${activePreset === 3 ? styles.presetActive : ''}`}
              onClick={() => handleSelectPreset(3)}
              disabled={isRunning}
            >
              ⚡ Autoscale 12 Pods
            </button>
          </div>

          {/* Code Editor Body */}
          <div className={styles.editorBody}>
            <div ref={lineNumbersRef} className={styles.lineNumbersGutter} aria-hidden="true">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className={styles.lineNumber}>{i + 1}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              className={styles.codeTextarea}
              value={draftCode}
              onChange={(e) => {
                setDraftCode(e.target.value);
                setActivePreset(null);
              }}
              onScroll={handleEditorScroll}
              disabled={isRunning}
              spellCheck={false}
              aria-label="Editable source code for production service"
            />
          </div>

          {/* Git Commit & Push Footer */}
          <div className={styles.ideFooter}>
            <div className={styles.commitInputWrapper}>
              <span className={styles.commitPrefix}>commit:</span>
              <input
                type="text"
                className={styles.commitInput}
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                disabled={isRunning}
                placeholder="Commit message (e.g., feat: deploy updated metrics)"
              />
            </div>
            
            <button
              type="button"
              className={styles.pushBtn}
              onClick={runPipeline}
              disabled={isRunning || !hasChanges}
              title={!hasChanges ? "No modified code to commit" : "Trigger CI/CD Pipeline"}
            >
              {isRunning ? (
                <>
                  <FaSync className={styles.spin} />
                  <span>Deploying Pipeline...</span>
                </>
              ) : (
                <>
                  <FaRocket />
                  <span>Commit &amp; Push to Main</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Production Browser Frame with Actual <iframe> */}
        <div className={styles.browserPanel}>
          <div className={styles.browserHeader}>
            <div className={styles.windowDots}>
              <span className={styles.dot} style={{ background: '#ff5f56' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#27c93f' }} />
            </div>

            <div className={styles.browserAddressBar}>
              <FaLock size={10} color="#00ffc8" className={styles.lockIcon} />
              <span className={styles.browserUrl}>https://prod-edge.cluster.shirish.dev</span>
              
              <div className={styles.trafficPill}>
                {isRunning ? (
                  <span className={styles.pillDeploying}>
                    <span className={styles.pulseDotAmber} /> CANARY ROLLING
                  </span>
                ) : (
                  <span className={styles.pillHealthy}>
                    <span className={styles.pulseDotGreen} /> 200 OK • 12ms
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              className={styles.refreshBtn}
              onClick={handleRefreshIframe}
              title="Reload live production iframe"
            >
              <FaRedo size={11} className={isReloading ? styles.spin : ''} />
            </button>
          </div>

          {/* Viewport for the Real Iframe */}
          <div className={styles.iframeViewport}>
            <iframe
              key={iframeKey}
              srcDoc={deployedCode}
              title="Live Deployed Production Service"
              sandbox="allow-scripts allow-modals"
              className={styles.liveIframe}
            />

            {/* Zero-Downtime Deployment Success Overlay */}
            {showDeploySuccess && (
              <div className={styles.deploySuccessOverlay}>
                <div className={styles.scannerLine} />
                <div className={styles.successToast}>
                  <FaCheckCircle color="#00ffc8" size={20} />
                  <div className={styles.successToastText}>
                    <h4>Zero-Downtime Rollout Succeeded!</h4>
                    <p>Revision <strong>v{version}</strong> (<code>{revisionHash}</code>) successfully deployed to Production.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Browser Telemetry Footer */}
          <div className={styles.browserFooter}>
            <div className={styles.telemetryItem}>
              <FaServer size={12} color="#00ffc8" />
              <span>Cluster: <strong>k8s-prod-eu1</strong> (3/3 Pods)</span>
            </div>
            <div className={styles.telemetryItem}>
              <FaShieldAlt size={12} color="#38bdf8" />
              <span>Revision: <strong>v{version}-{revisionHash}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Automation Section */}
      <div className={styles.pipelineSection}>
        <div className={styles.pipelineHeaderRow}>
          <div>
            <h3 className={styles.pipelineTitle}>Automated Delivery Workflow</h3>
            <p className={styles.pipelineDesc}>End-to-end GitOps orchestration from git push to cluster rollout</p>
          </div>
          <div className={styles.pipelineStatusBadge}>
            {isRunning ? (
              <span className={styles.statusRunning}>
                <FaSync className={styles.spin} size={12} /> PIPELINE IN EXECUTION
              </span>
            ) : activeStep === 5 ? (
              <span className={styles.statusSuccess}>
                <FaCheck size={12} /> WORKFLOW SUCCEEDED
              </span>
            ) : (
              <span className={styles.statusStandby}>
                ● STANDBY • READY FOR COMMIT
              </span>
            )}
          </div>
        </div>

        {/* 4 Interactive Pipeline Stages */}
        <div className={styles.pipelineGrid}>
          {pipelineStages.map((stage, index) => {
            const isActive = activeStep === stage.id;
            const isPassed = activeStep > stage.id || activeStep === 5;
            const isPending = activeStep < stage.id && activeStep !== 5;
            
            return (
              <div key={stage.id} className={styles.stageCardWrapper}>
                <div 
                  className={`
                    ${styles.stageCard} 
                    ${isActive ? styles.stageActive : ''} 
                    ${isPassed ? styles.stagePassed : ''}
                    ${isPending ? styles.stagePending : ''}
                  `}
                  style={{
                    borderColor: isActive ? stage.color : isPassed ? '#238636' : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive ? `0 0 25px ${stage.color}40, inset 0 0 15px ${stage.color}20` : 'none'
                  }}
                >
                  <div className={styles.stageTop}>
                    <div 
                      className={styles.stageIconBubble}
                      style={{
                        background: isActive ? `${stage.color}25` : isPassed ? 'rgba(35, 134, 54, 0.2)' : 'rgba(255,255,255,0.04)',
                        borderColor: isActive ? stage.color : isPassed ? '#238636' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <stage.icon 
                        size={22} 
                        color={isActive ? stage.color : isPassed ? '#3fb950' : '#888'} 
                        className={isActive ? styles.pulseIcon : ''} 
                      />
                    </div>
                    <div className={styles.stageToolPill} style={{ color: isActive ? stage.color : '#888' }}>
                      {stage.tool}
                    </div>
                  </div>

                  <div className={styles.stageMeta}>
                    <div className={styles.stageNumber}>STAGE {stage.id}</div>
                    <div className={styles.stageName}>{stage.name}</div>
                    <div className={styles.stageSummary}>{stage.summary}</div>
                  </div>

                  <div className={styles.stageFooter}>
                    {isActive && (
                      <span className={styles.stageRunningText} style={{ color: stage.color }}>
                        <FaSync className={styles.spin} size={10} /> Executing...
                      </span>
                    )}
                    {isPassed && (
                      <span className={styles.stagePassedText}>
                        <FaCheck size={11} /> Passed
                      </span>
                    )}
                    {isPending && (
                      <span className={styles.stageQueuedText}>Queued</span>
                    )}
                  </div>
                </div>

                {/* Connector between cards */}
                {index < pipelineStages.length - 1 && (
                  <div className={styles.stageConnector}>
                    <div 
                      className={styles.stageConnectorFill}
                      style={{
                        width: isPassed ? '100%' : '0%',
                        background: stage.color,
                        boxShadow: isPassed ? `0 0 8px ${stage.color}` : 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DevOps Live Console / Pipeline Terminal Drawer */}
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalHeaderLeft}>
              <FaTerminal size={12} color="#00ffc8" />
              <span className={styles.terminalHost}>runner-agent-01 :: /var/log/pipeline.log</span>
              {isRunning && <span className={styles.terminalLiveBadge}>● STREAMING LOGS</span>}
            </div>

            <div className={styles.terminalHeaderRight}>
              <button
                type="button"
                className={styles.terminalToggleBtn}
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              >
                {isTerminalOpen ? 'Hide Logs ▲' : 'Show Logs ▼'}
              </button>
            </div>
          </div>

          {isTerminalOpen && (
            <div ref={terminalBodyRef} className={styles.terminalBody}>
              {terminalLogs.map((log, index) => (
                <div key={index} className={styles.terminalRow}>
                  <span className={styles.logTimestamp}>{log.time}</span>
                  <span 
                    className={styles.logTag} 
                    style={{ color: log.tagColor, borderColor: `${log.tagColor}40`, backgroundColor: `${log.tagColor}10` }}
                  >
                    {log.tag}
                  </span>
                  <span className={styles.logMsg}>{log.msg}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
