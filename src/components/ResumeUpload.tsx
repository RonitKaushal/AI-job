'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { mockResumeData, ResumeData } from '@/lib/mockData';

interface ResumeUploadProps {
  onAnalysisComplete: (data: ResumeData) => void;
}

type UploadState = 'idle' | 'dragging' | 'uploaded' | 'analyzing' | 'done';

export default function ResumeUpload({ onAnalysisComplete }: ResumeUploadProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const simulateAnalysis = useCallback((name: string, size: string) => {
    setFileName(name);
    setFileSize(size);
    setState('uploaded');

    setTimeout(() => {
      setState('analyzing');
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 18 + 6;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setTimeout(() => {
            setState('done');
            onAnalysisComplete(mockResumeData);
          }, 300);
        }
        setProgress(Math.min(prog, 100));
      }, 160);
    }, 600);
  }, [onAnalysisComplete]);

  const handleFile = useCallback((file: File) => {
    const sizeKB = (file.size / 1024).toFixed(1);
    simulateAnalysis(file.name, `${sizeKB} KB`);
  }, [simulateAnalysis]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState('idle');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const reset = () => {
    setState('idle');
    setFileName('');
    setFileSize('');
    setProgress(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Resume Upload</h2>
          <p className="text-sm text-muted mt-0.5">PDF or DOCX · Max 10 MB</p>
        </div>
        {state === 'done' && (
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#16a34a' }}>
            <CheckCircle size={14} />
            Analyzed
          </span>
        )}
      </div>

      {(state === 'idle' || state === 'dragging') && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setState('dragging'); }}
          onDragLeave={() => setState('idle')}
          onClick={() => fileRef.current?.click()}
          className="fade-in"
          style={{
            border: `2px dashed ${state === 'dragging' ? 'var(--fg)' : 'var(--border)'}`,
            borderRadius: '10px',
            padding: '40px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: state === 'dragging' ? 'var(--surface-2)' : 'transparent',
          }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            transition: 'transform 0.2s ease',
            transform: state === 'dragging' ? 'scale(1.1)' : 'scale(1)',
          }}>
            <Upload size={22} color="var(--fg)" />
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
            {state === 'dragging' ? 'Drop it here!' : 'Drag & drop your resume'}
          </p>
          <p className="text-xs text-muted mt-1.5">or click to browse files</p>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.doc"
            className="hidden"
            onChange={handleInput}
          />
        </div>
      )}

      {(state === 'uploaded' || state === 'analyzing' || state === 'done') && (
        <div className="fade-in space-y-4">
          {/* File Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            background: 'var(--surface-2)',
            borderRadius: 10,
            border: '1px solid var(--border)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: 'var(--fg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <FileText size={18} color="var(--bg)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="text-sm font-medium truncate" style={{ color: 'var(--fg)' }}>{fileName}</p>
              <p className="text-xs text-muted">{fileSize}</p>
            </div>
            {state !== 'analyzing' && (
              <button onClick={reset} style={{ color: 'var(--muted)', cursor: 'pointer', background: 'none', border: 'none' }}>
                <X size={16} />
              </button>
            )}
            {state === 'done' && <CheckCircle size={18} color="#16a34a" />}
          </div>

          {/* Analysis Progress */}
          {state === 'analyzing' && (
            <div className="fade-in space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Analyzing resume…</span>
                <span className="text-xs font-mono" style={{ color: 'var(--fg)' }}>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex gap-4 pt-1">
                {['Extracting skills', 'Parsing experience', 'Checking education'].map((label, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="skeleton" style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block' }} />
                    <span className="text-xs text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extracted Profile */}
          {state === 'done' && (
            <div className="fade-in space-y-4 pt-1">
              <div style={{ padding: '16px', background: 'var(--surface-2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div className="flex items-start gap-3 mb-4">
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--fg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 16, fontWeight: 700, color: 'var(--bg)',
                  }}>
                    {mockResumeData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{mockResumeData.name}</p>
                    <p className="text-xs text-muted">{mockResumeData.title}</p>
                    <p className="text-xs text-muted">{mockResumeData.education}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted mb-2">EXTRACTED SKILLS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {mockResumeData.skills.map((skill, i) => (
                        <span key={i} className={`tag stagger-${Math.min(i + 1, 6)}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-1">
                    <div>
                      <p className="text-xs text-muted">Experience</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{mockResumeData.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skeleton while uploaded (pre-analyze) */}
          {state === 'uploaded' && (
            <div className="space-y-2 pt-1">
              <div className="skeleton" style={{ height: 14, width: '60%' }} />
              <div className="skeleton" style={{ height: 14, width: '40%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
