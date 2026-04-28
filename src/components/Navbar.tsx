'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, Zap } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled
          ? theme === 'dark' ? 'rgba(10,10,10,0.88)' : 'rgba(255,255,255,0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'var(--fg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Zap size={15} color="var(--bg)" fill="var(--bg)" />
          </div>
          <div>
            <span
              className="text-sm font-bold"
              style={{ color: 'var(--fg)', letterSpacing: '-0.02em' }}
            >
              JobScan
            </span>
            <span
              className="text-xs font-medium"
              style={{
                marginLeft: 6,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '1px 5px',
                color: 'var(--muted)',
                fontSize: '0.65rem',
              }}
            >
              BETA
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="btn-outline flex items-center gap-1.5"
            style={{ fontSize: '0.75rem', padding: '6px 10px' }}
          >
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            onClick={onToggleTheme}
            className="btn-outline"
            style={{ padding: '7px 10px', borderRadius: 8 }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
