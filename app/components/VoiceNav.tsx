"use client";

import { useEffect, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

interface SpeechRecognitionEvent {
  results: {
    length: number;
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

export default function VoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const win = window as unknown as Record<string, unknown>;
    const hasSpeech = Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
    if (hasSpeech) {
      const timer = setTimeout(() => setSupported(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!supported || typeof window === 'undefined') return;

    const win = window as unknown as Record<string, new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: ((event: SpeechRecognitionEvent) => void) | null;
      onerror: ((event: { error: string }) => void) | null;
      start: () => void;
      stop: () => void;
    }>;

    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase().trim();
      
      console.log('Voice command heard:', command);

      if (command.includes('home')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (command.includes('pipeline') || command.includes('demo')) {
        window.scrollBy({ top: 800, behavior: 'smooth' });
      } else if (command.includes('skills') || command.includes('radar')) {
        window.scrollBy({ top: 1600, behavior: 'smooth' });
      }
    };

    recognition.onerror = (event: { error: string }) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, supported]);

  if (!supported) return null;

  return (
    <button
      onClick={() => setIsListening(!isListening)}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: isListening ? 'rgba(var(--color-accent), 0.2)' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${isListening ? 'rgb(var(--color-accent))' : 'rgba(255,255,255,0.2)'}`,
        color: isListening ? 'rgb(var(--color-accent))' : '#fff',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isListening ? '0 0 20px rgba(var(--color-accent), 0.4)' : 'none',
        zIndex: 1000
      }}
      title={isListening ? "Listening... Say 'show skills' or 'home'" : "Enable Voice Navigation"}
    >
      {isListening ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
    </button>
  );
}
