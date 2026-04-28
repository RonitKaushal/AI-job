'use client';

import { useEffect, useState } from 'react';
import { MapPin, Briefcase, Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { mockSuggestedJobs } from '@/lib/mockData';

export default function JobSuggestions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const getMatchColor = (pct: number) => {
    if (pct >= 85) return '#16a34a';
    if (pct >= 70) return '#d97706';
    return '#dc2626';
  };

  const getMatchBg = (pct: number) => {
    if (pct >= 85) return { bg: '#f0fdf4', border: '#bbf7d0', color: '#166534' };
    if (pct >= 70) return { bg: '#fffbeb', border: '#fde68a', color: '#92400e' };
    return { bg: '#fef2f2', border: '#fecaca', color: '#991b1b' };
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Suggested Jobs</h2>
          <p className="text-sm text-muted mt-0.5">Matched to your resume profile</p>
        </div>
        <span
          className="tag"
          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem' }}
        >
          <TrendingUp size={11} />
          {mockSuggestedJobs.length} matches
        </span>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        {mockSuggestedJobs.map((job, i) => {
          const badge = getMatchBg(job.matchPercentage);
          return (
            <div
              key={job.id}
              className="card card-hover p-5 space-y-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
              }}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2">
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 15, fontWeight: 800, color: 'var(--fg)',
                }}>
                  {job.company.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--fg)' }}>
                    {job.title}
                  </p>
                  <p className="text-xs text-muted truncate">{job.company}</p>
                </div>
                <span
                  className="text-xs font-bold"
                  style={{
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    borderRadius: 6,
                    padding: '3px 8px',
                    flexShrink: 0,
                  }}
                >
                  {job.matchPercentage}%
                </span>
              </div>

              {/* Meta */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={11} />
                  {job.location}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={11} />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {job.posted}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Match score</span>
                  <span className="text-xs font-medium" style={{ color: getMatchColor(job.matchPercentage) }}>
                    {job.matchPercentage >= 85 ? 'Strong' : job.matchPercentage >= 70 ? 'Good' : 'Fair'}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: visible ? `${job.matchPercentage}%` : '0%',
                      background: getMatchColor(job.matchPercentage),
                      transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.06 + 0.3}s`,
                    }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag, j) => (
                  <span key={j} className="tag">{tag}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>
                  {job.salary}
                </span>
                <button
                  className="btn-outline flex items-center gap-1.5"
                  style={{ fontSize: '0.72rem', padding: '5px 10px', borderRadius: 6 }}
                  onClick={() => {}}
                >
                  View Job
                  <ExternalLink size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
