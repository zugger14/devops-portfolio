"use client";

import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('cyberpunk');

  const toggleTheme = () => {
    const newTheme = theme === 'cyberpunk' ? 'synthwave' : 'cyberpunk';
    
    // Use View Transition API if supported for the smooth gradient shift
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    } else {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '0.95rem',
        flexShrink: 0,
        transition: 'all 0.25s ease'
      }}
      title="Toggle Theme"
    >
      {theme === 'cyberpunk' ? <FaMoon /> : <FaSun />}
    </button>
  );
}
