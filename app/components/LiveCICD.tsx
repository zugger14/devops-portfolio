"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  FaRocket,
  FaTimes,
  FaPalette,
  FaSlidersH,
  FaCodeBranch,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaCog,
} from "react-icons/fa";
import styles from "./livecicd.module.css";

/* ─── Types ──────────────────────────────────────────────────── */

interface DesignTokens {
  primaryColor: string;
  accentColor: string;
  bgStart: string;
  bgEnd: string;
  glowIntensity: number;     // 0‑100
  borderRadius: number;      // 0‑40  (px on CTA buttons)
}

type StageStatus = "pending" | "active" | "complete" | "failed";

interface PipelineStage {
  id: string;
  name: string;
  detail: string;
  duration: string;
  status: StageStatus;
}

/* ─── Defaults ───────────────────────────────────────────────── */

const DEFAULT_TOKENS: DesignTokens = {
  primaryColor: "#00FFC8",
  accentColor: "#FFB300",
  bgStart: "#0B192C",
  bgEnd: "#000000",
  glowIntensity: 50,
  borderRadius: 9999,
};

const INITIAL_PIPELINE: PipelineStage[] = [
  { id: "css",     name: "Write CSS Variables",   detail: "globals.css → CSS custom props", duration: "", status: "pending" },
  { id: "git",     name: "Git Commit & Push",     detail: "git add . && git commit && push",  duration: "", status: "pending" },
  { id: "ci",      name: "CI — Lint & Build",     detail: "npm run lint && npm run build",     duration: "", status: "pending" },
  { id: "docker",  name: "Docker Build & Push",   detail: "docker build → ECR push",          duration: "", status: "pending" },
  { id: "deploy",  name: "Deploy to Production",  detail: "ECS rolling update → LIVE",        duration: "", status: "pending" },
];

const REVERT_SECONDS = 90;

/* ─── Helpers ────────────────────────────────────────────────── */

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 255, 200";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/* ─── Component ──────────────────────────────────────────────── */

export default function LiveCICD() {
  const [open, setOpen] = useState(false);
  const [tokens, setTokens] = useState<DesignTokens>({ ...DEFAULT_TOKENS });
  const [deploying, setDeploying] = useState(false);
  const [deployDone, setDeployDone] = useState(false);
  const [deployError, setDeployError] = useState("");
  const [pipeline, setPipeline] = useState<PipelineStage[]>(INITIAL_PIPELINE.map((s) => ({ ...s })));
  const [countdown, setCountdown] = useState(REVERT_SECONDS);
  const [commitHash, setCommitHash] = useState("");
  const revertTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Live CSS preview (instant, client‑only) ────────────── */
  const applyPreview = useCallback((t: DesignTokens) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", hexToRgb(t.primaryColor));
    root.style.setProperty("--color-accent", hexToRgb(t.accentColor));
    root.style.setProperty("--color-bg-start", t.bgStart);
    root.style.setProperty("--color-bg-end", t.bgEnd);
  }, []);

  const revertPreview = useCallback(() => {
    const root = document.documentElement;
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-accent");
    root.style.removeProperty("--color-bg-start");
    root.style.removeProperty("--color-bg-end");
  }, []);

  const updateToken = <K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
    const next = { ...tokens, [key]: value };
    setTokens(next);
    applyPreview(next);
  };

  /* ── Revert timer after deploy ─────────────────────────── */
  const startRevert = useCallback(() => {
    setCountdown(REVERT_SECONDS);
    if (revertTimerRef.current) clearInterval(revertTimerRef.current);
    revertTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(revertTimerRef.current!);
          revertTimerRef.current = null;
          // revert
          revertPreview();
          setTokens({ ...DEFAULT_TOKENS });
          setDeployDone(false);
          setPipeline(INITIAL_PIPELINE.map((s) => ({ ...s })));
          return REVERT_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
  }, [revertPreview]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (revertTimerRef.current) clearInterval(revertTimerRef.current);
    };
  }, []);

  /* ── Deploy pipeline ───────────────────────────────────── */
  const advanceStage = (stageIndex: number, status: StageStatus, duration?: string) => {
    setPipeline((prev) =>
      prev.map((s, i) =>
        i === stageIndex ? { ...s, status, duration: duration || s.duration } : s
      )
    );
  };

  const runDeploy = async () => {
    setDeploying(true);
    setDeployDone(false);
    setDeployError("");
    const randomHash = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setCommitHash(randomHash);
    setPipeline(INITIAL_PIPELINE.map((s) => ({ ...s })));

    const delays = [600, 800, 1200, 900, 700];
    const durations = ["0.6s", "0.8s", "1.2s", "0.9s", "0.7s"];

    try {
      applyPreview(tokens);
      for (let i = 0; i < INITIAL_PIPELINE.length; i++) {
        advanceStage(i, "active");
        await new Promise((r) => setTimeout(r, delays[i]));
        advanceStage(i, "complete", durations[i]);
      }

      setDeployDone(true);
      startRevert();
    } catch {
      setDeployError("Deployment simulation error. Please try again.");
    } finally {
      setDeploying(false);
    }
  };

  const handleReset = () => {
    if (revertTimerRef.current) {
      clearInterval(revertTimerRef.current);
      revertTimerRef.current = null;
    }
    revertPreview();
    setTokens({ ...DEFAULT_TOKENS });
    setDeployDone(false);
    setDeployError("");
    setPipeline(INITIAL_PIPELINE.map((s) => ({ ...s })));
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <>
      {/* Floating Trigger */}
      <button
        type="button"
        className={styles.triggerButton}
        onClick={() => {
          setOpen(true);
          applyPreview(tokens);
        }}
        aria-label="Open Live CI/CD Playground"
      >
        <FaRocket className={styles.triggerIcon} />
        <span>Live CI/CD</span>
        <span className={styles.triggerPing} />
      </button>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
        {/* Header */}
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <FaCodeBranch className={styles.panelTitleIcon} />
            <span className={styles.panelTitleText}>Live CI/CD</span>
            <span className={styles.panelTitleBadge}>Playground</span>
          </div>
          <button type="button" className={styles.closeButton} onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className={styles.panelBody}>
          {/* Info banner */}
          <div className={styles.infoBanner}>
            <FaInfoCircle className={styles.infoBannerIcon} />
            <span>
              Tweak design tokens and hit <strong style={{ color: "#00FFC8" }}>Deploy</strong> to
              simulate the full CI/CD pipeline. Changes apply live to your active session and
              auto-revert after {REVERT_SECONDS}s.
            </span>
          </div>

          {/* Preview badge */}
          <div className={styles.previewBadge}>
            <span className={styles.previewDot} />
            Live Preview Active
          </div>

          {/* ── Color Controls ───────────────────────── */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <FaPalette className={styles.controlLabelIcon} />
              Primary Color
            </label>
            <div className={styles.colorPickerRow}>
              <input
                type="color"
                className={styles.colorSwatch}
                value={tokens.primaryColor}
                onChange={(e) => updateToken("primaryColor", e.target.value)}
              />
              <input
                type="text"
                className={styles.colorHexInput}
                value={tokens.primaryColor}
                onChange={(e) => updateToken("primaryColor", e.target.value)}
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <FaPalette className={styles.controlLabelIcon} />
              Accent Color
            </label>
            <div className={styles.colorPickerRow}>
              <input
                type="color"
                className={styles.colorSwatch}
                value={tokens.accentColor}
                onChange={(e) => updateToken("accentColor", e.target.value)}
              />
              <input
                type="text"
                className={styles.colorHexInput}
                value={tokens.accentColor}
                onChange={(e) => updateToken("accentColor", e.target.value)}
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <FaPalette className={styles.controlLabelIcon} />
              Background Start
            </label>
            <div className={styles.colorPickerRow}>
              <input
                type="color"
                className={styles.colorSwatch}
                value={tokens.bgStart}
                onChange={(e) => updateToken("bgStart", e.target.value)}
              />
              <input
                type="text"
                className={styles.colorHexInput}
                value={tokens.bgStart}
                onChange={(e) => updateToken("bgStart", e.target.value)}
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <FaPalette className={styles.controlLabelIcon} />
              Background End
            </label>
            <div className={styles.colorPickerRow}>
              <input
                type="color"
                className={styles.colorSwatch}
                value={tokens.bgEnd}
                onChange={(e) => updateToken("bgEnd", e.target.value)}
              />
              <input
                type="text"
                className={styles.colorHexInput}
                value={tokens.bgEnd}
                onChange={(e) => updateToken("bgEnd", e.target.value)}
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </div>

          <div className={styles.divider} />

          {/* ── Slider Controls ──────────────────────── */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <FaSlidersH className={styles.controlLabelIcon} />
              Glow Intensity
            </label>
            <div className={styles.sliderRow}>
              <input
                type="range"
                className={styles.slider}
                min={0}
                max={100}
                value={tokens.glowIntensity}
                onChange={(e) => updateToken("glowIntensity", Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{tokens.glowIntensity}%</span>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <FaSlidersH className={styles.controlLabelIcon} />
              Button Border Radius
            </label>
            <div className={styles.sliderRow}>
              <input
                type="range"
                className={styles.slider}
                min={0}
                max={40}
                value={tokens.borderRadius > 40 ? 40 : tokens.borderRadius}
                onChange={(e) => updateToken("borderRadius", Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{tokens.borderRadius > 40 ? "pill" : `${tokens.borderRadius}px`}</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* ── Deploy Button ────────────────────────── */}
          <button
            type="button"
            className={styles.deployButton}
            onClick={runDeploy}
            disabled={deploying}
          >
            {deploying ? (
              <FaSpinner className={styles.deployButtonIcon} style={{ animation: "stageSpinner 1s linear infinite" }} />
            ) : (
              <FaRocket className={styles.deployButtonIcon} />
            )}
            {deploying ? "Deploying..." : "Deploy to Production"}
          </button>

          {/* ── CI/CD Pipeline Visualization ─────────── */}
          {(deploying || deployDone || deployError) && (
            <div className={styles.pipelineContainer}>
              <div className={styles.pipelineTitle}>
                <span className={styles.pipelineTitleDot} />
                CI/CD Pipeline
              </div>
              <div className={styles.pipelineStages}>
                {pipeline.map((stage) => (
                  <div
                    key={stage.id}
                    className={`${styles.pipelineStage} ${
                      stage.status === "active" ? styles.stageActive :
                      stage.status === "complete" ? styles.stageComplete :
                      stage.status === "failed" ? styles.stageFailed : ""
                    }`}
                  >
                    <div className={styles.stageIndicator}>
                      {stage.status === "active" && <FaCog />}
                      {stage.status === "complete" && <FaCheckCircle />}
                      {stage.status === "failed" && <FaTimesCircle />}
                      {stage.status === "pending" && <span>○</span>}
                    </div>
                    <div className={styles.stageInfo}>
                      <div className={styles.stageName}>{stage.name}</div>
                      <div className={styles.stageDetail}>{stage.detail}</div>
                    </div>
                    {stage.duration && (
                      <div className={styles.stageDuration}>{stage.duration}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Success */}
              {deployDone && (
                <div className={styles.deploySuccess}>
                  <FaCheckCircle className={styles.deploySuccessIcon} />
                  <div className={styles.deploySuccessText}>
                    <strong>Deployed!</strong> Design changes are now live on this page. They&apos;ll auto-revert in {countdown}s.
                  </div>
                </div>
              )}

              {/* Error */}
              {deployError && (
                <div className={styles.deployError}>
                  <FaTimesCircle />
                  <span>{deployError}</span>
                </div>
              )}

              {/* Commit log */}
              {commitHash && (
                <div className={styles.commitLog}>
                  <span className={styles.commitBranch}>main</span>{" "}
                  <span className={styles.commitHash}>{commitHash.slice(0, 7)}</span>{" "}
                  feat: live cicd design update{"\n"}
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>
                    Author: visitor@portfolio.dev
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Countdown bar */}
          {deployDone && (
            <div className={styles.countdownBar}>
              <div className={styles.countdownLabel}>
                <span>Auto-revert</span>
                <span>{countdown}s remaining</span>
              </div>
              <div className={styles.countdownTrack}>
                <div
                  className={styles.countdownFill}
                  style={{ width: `${(countdown / REVERT_SECONDS) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Reset */}
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </>
  );
}
