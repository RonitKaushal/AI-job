'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { mockJobAnalysis } from '@/lib/mockData';

export default function AnalysisResult() {
  const [animated, setAnimated] = useState(false);
  const [displayPct, setDisplayPct] = useState(0);
  const data = mockJobAnalysis;

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimated(true);
      let val = 0;
      const iv = setInterval(() => {
        val += 2;
        if (val >= data.matchPercentage) {
          val = data.matchPercentage;
          clearInterval(iv);
        }
        setDisplayPct(val);
      }, 20);
    }, 200);
    return () => clearTimeout(t);
  }, [data.matchPercentage]);

  const verdictConfig = {
    eligible: {
      label: 'You are Eligible',
      color: '#16a34a',
      bg: '#f0fdf4',
      darkBg: '#052e16',
      border: '#bbf7d0',
      darkBorder: '#166534',
      icon: '✦',
    },
    partial: {
      label: 'Partially Eligible',
      color: '#d97706',
      bg: '#fffbeb',
      darkBg: '#1c1200',
      border: '#fde68a',
      darkBorder: '#92400e',
      icon: '◈',
    },
    'not-eligible': {
      label: 'Not Eligible',
      color: '#dc2626',
      bg: '#fef2f2',
      darkBg: '#2d0a0a',
      border: '#fecaca',
      darkBorder: '#7f1d1d',
      icon: '✕',
    },
  };

  const verdict = verdictConfig[data.verdict];

  const experienceConfig = {
    Strong: { width: '90%', color: '#16a34a' },
    Moderate: { width: '60%', color: '#d97706' },
    Weak: { width: '30%', color: '#dc2626' },
  };

  const expBar = experienceConfig[data.experienceMatch];

  return (
    <div className="space-y-5 fade-in">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Eligibility Result</h2>
        <p className="text-sm text-muted">Based on your resume vs. the job description</p>
      </div>

      {/* Match Score Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-medium text-muted mb-1">OVERALL MATCH</p>
            <p className="text-5xl font-bold" style={{ color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>
              {displayPct}<span className="text-2xl font-medium text-muted">%</span>
            </p>
          </div>
          {/* Circular progress */}
          <svg width={90} height={90} viewBox="0 0 90 90">
            <circle cx={45} cy={45} r={38} fill="none" stroke="var(--border)" strokeWidth={6} />
            <circle
              cx={45} cy={45} r={38}
              fill="none"
              stroke="var(--fg)"
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={animated ? `${2 * Math.PI * 38 * (1 - data.matchPercentage / 100)}` : `${2 * Math.PI * 38}`}
              transform="rotate(-90 45 45)"
              style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <text x={45} y={50} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--fg)">{data.matchPercentage}%</text>
          </svg>
        </div>

        {/* Progress bar full */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: animated ? `${data.matchPercentage}%` : '0%' }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-muted">0%</span>
          <span className="text-xs text-muted">100%</span>
        </div>
      </div>

      {/* Verdict Banner */}
      <div
        className="card p-4 flex items-start gap-3"
        style={{
          background: verdict.bg,
          borderColor: verdict.border,
        }}
      >
        <span style={{
          width: 36, height: 36, borderRadius: 8,
          background: verdict.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 16, fontWeight: 800, flexShrink: 0,
        }}>
          {verdict.icon}
        </span>
        <div>
          <p className="text-sm font-semibold" style={{ color: verdict.color }}>{verdict.label}</p>
          <p className="text-xs mt-0.5" style={{ color: verdict.color, opacity: 0.75 }}>{data.verdictReason}</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Matching Skills */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} color="#16a34a" />
            <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>Matching Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.matchingSkills.map((skill, i) => (
              <span key={i} className="tag tag-success">{skill}</span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <XCircle size={15} color="#dc2626" />
            <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>Missing Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.missingSkills.map((skill, i) => (
              <span key={i} className="tag tag-danger">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Match */}
      <div className="card p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={15} color="var(--fg)" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>Experience Match</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">Seniority alignment</span>
          <span className="text-xs font-semibold" style={{ color: expBar.color }}>{data.experienceMatch}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: animated ? expBar.width : '0%',
              background: expBar.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
