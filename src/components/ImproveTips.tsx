'use client';

import { Lightbulb, ArrowRight } from 'lucide-react';
import { resumeImprovementTips } from '@/lib/mockData';

export default function ImproveTips() {
  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <div
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--fg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Lightbulb size={15} color="var(--bg)" />
        </div>
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Improve Your Resume</h2>
          <p className="text-xs text-muted">AI-powered static suggestions</p>
        </div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {resumeImprovementTips.map((tip, i) => (
          <div
            key={i}
            className={`stagger-${i + 1}`}
            style={{
              padding: '16px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              transition: 'border-color 0.2s ease, transform 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--fg)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div className="flex items-start gap-3">
              <span style={{
                fontSize: 18, lineHeight: 1,
                color: 'var(--fg)',
                flexShrink: 0,
                marginTop: 1,
              }}>
                {tip.icon}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{tip.title}</p>
                <p className="text-xs" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '14px 16px',
          background: 'var(--surface-2)',
          borderRadius: 10,
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>Want a full resume review?</p>
          <p className="text-xs text-muted">Get detailed feedback on formatting, content & ATS compatibility</p>
        </div>
        <button
          className="btn-primary flex items-center gap-1.5 shrink-0"
          style={{ fontSize: '0.75rem', padding: '7px 12px' }}
        >
          Coming soon
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
