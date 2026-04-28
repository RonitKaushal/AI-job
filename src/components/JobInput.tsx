'use client';

import { useState } from 'react';
import { Sparkles, FileSearch, RotateCcw } from 'lucide-react';

const SAMPLE_JD = `We are looking for a Frontend Engineer with 2+ years of experience building modern web applications.

Requirements:
• Proficiency in React and TypeScript
• Experience with Node.js and REST APIs
• Familiarity with Git workflow and code reviews
• Experience with GraphQL (nice to have)
• Knowledge of AWS or cloud infrastructure (nice to have)
• Docker experience is a plus

Responsibilities:
• Build and maintain responsive web interfaces
• Collaborate with designers using Figma
• Optimize application performance

Location: Remote / San Francisco · Salary: $90k–$120k`;

interface JobInputProps {
  onAnalyze: () => void;
  analyzed: boolean;
}

export default function JobInput({ onAnalyze, analyzed }: JobInputProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAnalyze();
    }, 2200);
  };

  const loadSample = () => {
    setText(SAMPLE_JD);
  };

  const clear = () => {
    setText('');
  };

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Job Description</h2>
          <p className="text-sm text-muted mt-0.5">Paste a LinkedIn or any job post below</p>
        </div>
        {!analyzed && (
          <button
            onClick={loadSample}
            className="btn-outline text-xs px-3 py-1.5"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            Load sample
          </button>
        )}
        {analyzed && (
          <button
            className="btn-outline text-xs px-3 py-1.5 flex items-center gap-1.5"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            onClick={() => { clear(); window.location.reload(); }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste job description here…"
        disabled={loading || analyzed}
        style={{
          width: '100%',
          minHeight: 180,
          resize: 'vertical',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '14px',
          color: 'var(--fg)',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          outline: 'none',
          transition: 'border-color 0.2s ease',
          fontFamily: 'inherit',
          opacity: analyzed ? 0.6 : 1,
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--fg)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />

      {/* Character count */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">{text.length} characters</span>
        {text.length > 0 && !analyzed && (
          <span className="text-xs text-muted">{text.split(/\s+/).filter(Boolean).length} words</span>
        )}
      </div>

      {!analyzed && (
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || loading}
          className="btn-primary w-full justify-center"
          style={{
            width: '100%',
            justifyContent: 'center',
            opacity: !text.trim() ? 0.45 : 1,
            cursor: !text.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <>
              <span className="spin inline-block" style={{ width: 14, height: 14, border: '2px solid var(--accent-fg)', borderTopColor: 'transparent', borderRadius: '50%' }} />
              Parsing job description…
            </>
          ) : (
            <>
              <FileSearch size={15} />
              Analyze Job
            </>
          )}
        </button>
      )}

      {loading && (
        <div className="fade-in space-y-2">
          <div className="flex gap-3">
            {['Extracting requirements', 'Identifying skills', 'Mapping keywords'].map((label, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--fg)', display: 'inline-block', animationDelay: `${i * 0.3}s` }} />
                <span className="text-xs text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {analyzed && (
        <div className="fade-in flex items-center gap-2 text-xs" style={{ color: '#16a34a' }}>
          <Sparkles size={13} />
          Job description analyzed successfully
        </div>
      )}
    </div>
  );
}
