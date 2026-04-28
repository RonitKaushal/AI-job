'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResumeUpload from '@/components/ResumeUpload';
import JobInput from '@/components/JobInput';
import AnalysisResult from '@/components/AnalysisResult';
import JobSuggestions from '@/components/JobSuggestions';
import ImproveTips from '@/components/ImproveTips';
import { ResumeData } from '@/lib/mockData';
import { ArrowDown, Zap, FileText, Target } from 'lucide-react';

type Theme = 'light' | 'dark';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('light');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [jobAnalyzed, setJobAnalyzed] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const handleJobAnalyzed = () => {
    setJobAnalyzed(true);
    // Stagger results appearance
    setTimeout(() => setShowResults(true), 200);
  };

  const canAnalyze = !!resumeData;

  // Step indicator
  const steps = [
    { label: 'Upload Resume', done: !!resumeData, icon: FileText },
    { label: 'Paste Job Post', done: jobAnalyzed, icon: Target },
    { label: 'View Results', done: showResults, icon: Zap },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />



      {/* Main Content */}
      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        {/* Upload + Job Input — always visible */}
        <div
          className="grid gap-6 mb-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
        >
          <div className="stagger-1">
            <ResumeUpload onAnalysisComplete={(data) => setResumeData(data)} />
          </div>
          <div className="stagger-2">
            <JobInput onAnalyze={handleJobAnalyzed} analyzed={jobAnalyzed} />
          </div>
        </div>

        {/* Not ready yet nudge */}
        {!canAnalyze && !jobAnalyzed && (
          <div
            className="fade-in"
            style={{
              textAlign: 'center',
              padding: '32px 24px',
              border: '1px dashed var(--border)',
              borderRadius: 12,
              marginBottom: 40,
            }}
          >
            <p className="text-sm text-muted">
              Upload your resume and paste a job post to see your eligibility result →
            </p>
          </div>
        )}

        {/* Section divider */}
        {showResults && (
          <div style={{ borderTop: '1px solid var(--border)', marginBottom: 40 }} />
        )}

        {/* Analysis Result */}
        {showResults && (
          <div className="mb-10 fade-in">
            <AnalysisResult />
          </div>
        )}

        {/* Suggested Jobs — show when resume is uploaded */}
        {resumeData && (
          <>
            <div style={{ borderTop: '1px solid var(--border)', marginBottom: 40 }} />
            <div className="mb-10 fade-in">
              <JobSuggestions />
            </div>
          </>
        )}

        {/* Improve Resume Tips — show when job is analyzed */}
        {showResults && (
          <>
            <div style={{ borderTop: '1px solid var(--border)', marginBottom: 40 }} />
            <div className="fade-in">
              <ImproveTips />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p className="text-xs text-muted">
          JobScan · Prototype — All data is simulated and for demo purposes only ·{' '}
          <span style={{ color: 'var(--fg)', fontWeight: 500 }}>No real AI is used</span>
        </p>
      </footer>
    </div>
  );
}
