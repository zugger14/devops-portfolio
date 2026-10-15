"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaTimes, 
  FaExclamationTriangle, 
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import styles from './voiceNav.module.css';

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognitionResultItem {
  transcript: string;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResultItem[];
  length: number;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface IWindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

const COMMAND_MAP: Array<{ keywords: string[]; targetId: string; label: string }> = [
  { keywords: ['home', 'top', 'start', 'intro'], targetId: 'home', label: 'Home' },
  { keywords: ['project', 'projects', 'work', 'showcase'], targetId: 'projects', label: 'Projects' },
  { keywords: ['experience', 'career', 'history', 'company', 'companies', 'timeline'], targetId: 'experience', label: 'Experience' },
  { keywords: ['skill', 'skills', 'skillset', 'radar', 'stack', 'tech'], targetId: 'skillset', label: 'Skill Radar' },
  { keywords: ['contact', 'hire', 'email', 'touch', 'message'], targetId: 'contact', label: 'Contact' }
];

export default function VoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hudOpen, setHudOpen] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>('');
  const [matchedAction, setMatchedAction] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<{ title: string; tip: string } | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const activeListeningRef = useRef(false);

  const navigateToSection = useCallback((targetId: string, label: string) => {
    setMatchedAction(`Navigating to ${label} 🚀`);
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      setMatchedAction(null);
    }, 4000);
  }, []);

  const handleCommand = useCallback((transcript: string) => {
    const cleanText = transcript.toLowerCase().trim();
    setLastTranscript(cleanText);

    for (const cmd of COMMAND_MAP) {
      if (cmd.keywords.some((kw) => cleanText.includes(kw))) {
        navigateToSection(cmd.targetId, cmd.label);
        return;
      }
    }
  }, [navigateToSection]);

  const stopListening = useCallback(() => {
    activeListeningRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Safe ignore
      }
    }
  }, []);

  const startListening = useCallback(() => {
    setErrorMessage(null);
    setMatchedAction(null);
    setHudOpen(true);

    if (typeof window === 'undefined') return;

    // 1. Check secure context (Chrome blocks Web Speech over plain HTTP)
    if (window.isSecureContext === false && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      setErrorMessage({
        title: 'HTTPS Required by Browser',
        tip: 'Modern browsers restrict microphone access to HTTPS or localhost. If viewing on the EC2 IP, use localhost:3001 or configure SSL.'
      });
      setIsListening(false);
      return;
    }

    const win = window as unknown as IWindowWithSpeech;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setErrorMessage({
        title: 'Browser Not Supported',
        tip: 'The Web Speech API is not enabled in this browser. Please test in Google Chrome, Brave, or Edge.'
      });
      setIsListening(false);
      return;
    }

    try {
      if (!recognitionRef.current) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          activeListeningRef.current = true;
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (!event.results || event.results.length === 0) return;
          const lastIdx = event.results.length - 1;
          const transcript = event.results[lastIdx][0]?.transcript || '';
          if (transcript) {
            handleCommand(transcript);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.warn('[VoiceNav] Recognition error:', event.error);
          
          if (event.error === 'no-speech') {
            // Non-fatal: timeout waiting for audio
            setErrorMessage({
              title: 'No Speech Detected',
              tip: 'The microphone is still ready. Say "projects", "pipeline", or "contact".'
            });
            return;
          }

          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setErrorMessage({
              title: 'Microphone Permission Blocked',
              tip: 'Please allow microphone access in your browser address bar (click the tune/lock icon).'
            });
            stopListening();
            return;
          }

          if (event.error === 'network') {
            setErrorMessage({
              title: 'Network Speech Error',
              tip: 'Browser was unable to reach speech recognition service. Check your connection or VPN.'
            });
            stopListening();
            return;
          }

          if (event.error === 'audio-capture') {
            setErrorMessage({
              title: 'Microphone Hardware Error',
              tip: 'No working microphone was detected on this device.'
            });
            stopListening();
            return;
          }

          if (event.error === 'aborted') {
            return;
          }

          setErrorMessage({
            title: `Speech Error (${event.error})`,
            tip: 'Encountered a speech recognition error. Click the mic to try again.'
          });
          stopListening();
        };

        recognition.onend = () => {
          if (activeListeningRef.current) {
            // Gracefully restart if user still expects to listen
            try {
              recognition.start();
            } catch {
              setIsListening(false);
              activeListeningRef.current = false;
            }
          } else {
            setIsListening(false);
          }
        };

        recognitionRef.current = recognition;
      }

      recognitionRef.current.start();
      setIsListening(true);
      activeListeningRef.current = true;
    } catch (err: unknown) {
      console.warn('[VoiceNav] Start exception:', err);
      // Already running or permission issue
      if (err instanceof DOMException && err.name === 'InvalidStateError') {
        setIsListening(true);
        activeListeningRef.current = true;
      } else {
        setErrorMessage({
          title: 'Unable to Start Speech Recognition',
          tip: 'Click to retry or ensure microphone permission is granted in your browser.'
        });
        stopListening();
      }
    }
  }, [handleCommand, stopListening]);

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Cleanup
        }
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.voiceNavContainer} role="region" aria-label="Voice Navigation">
      {/* HUD Popup */}
      {hudOpen && (
        <div className={styles.voiceHud}>
          <div className={styles.hudHeader}>
            <div className={styles.hudTitleGroup}>
              {isListening && (
                <div className={styles.waveWrapper} aria-hidden="true">
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                </div>
              )}
              <span className={styles.hudTitle}>
                {isListening ? 'Voice Navigator' : 'Voice Controls'}
              </span>
            </div>
            <button 
              type="button" 
              className={styles.closeBtn} 
              onClick={() => {
                setHudOpen(false);
                stopListening();
              }}
              title="Close voice HUD"
              aria-label="Close voice navigation HUD"
            >
              <FaTimes size={13} />
            </button>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className={styles.errorAlert} role="alert">
              <div className={styles.errorTitle}>
                <FaExclamationTriangle size={13} />
                <span>{errorMessage.title}</span>
              </div>
              <p className={styles.errorTip}>{errorMessage.tip}</p>
            </div>
          )}

          {/* Transcript / Action Display */}
          <div className={styles.transcriptBox}>
            <span className={styles.transcriptLabel}>Live Feedback</span>
            {matchedAction ? (
              <div className={styles.actionSuccess}>
                <FaCheckCircle size={12} />
                <span>{matchedAction}</span>
              </div>
            ) : (
              <p className={styles.transcriptText}>
                {lastTranscript ? `"${lastTranscript}"` : isListening ? 'Listening for commands...' : 'Microphone idle.'}
              </p>
            )}
          </div>

          {/* Available Commands */}
          <div>
            <span className={styles.transcriptLabel}>Available Voice Commands:</span>
            <div className={styles.commandsList}>
              {COMMAND_MAP.map((cmd) => (
                <button
                  key={cmd.targetId}
                  type="button"
                  className={styles.commandChip}
                  onClick={() => navigateToSection(cmd.targetId, cmd.label)}
                  title={`Click or say "${cmd.keywords[0]}"`}
                >
                  <span>{cmd.label}</span>
                  <FaArrowRight size={9} style={{ opacity: 0.6 }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Primary Trigger Button */}
      <button
        type="button"
        onClick={toggleVoice}
        className={`${styles.micButton} ${isListening ? styles.micButtonListening : ''} ${errorMessage ? styles.micButtonError : ''}`}
        title={isListening ? "Listening... Click to stop" : "Click to activate Voice Navigation"}
        aria-label={isListening ? "Disable voice navigation" : "Enable voice navigation"}
      >
        {isListening && <span className={styles.micPulseRing} aria-hidden="true" />}
        {isListening ? <FaMicrophone size={22} /> : <FaMicrophoneSlash size={22} />}
      </button>
    </div>
  );
}
