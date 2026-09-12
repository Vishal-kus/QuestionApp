import React, { useState } from 'react';
import { User, Clock, Award, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export default function CandidateModal({ isOpen, onClose, onStartTest, paper }) {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your full name to proceed with the exam.');
      return;
    }
    if (!agreed) {
      setError('Please confirm that you have read and agreed to the examination guidelines.');
      return;
    }
    setError('');
    onStartTest(trimmed);
  };

  const paperTitle = paper?.title || 'UGC NET 2025 Mock Test';
  const paperSubject = paper?.subject || 'Computer Science & Applications (Paper II)';
  const paperDuration = paper?.durationMinutes 
    ? (paper.durationMinutes >= 60 ? `${paper.durationMinutes / 60} Hours (${paper.durationMinutes} Mins)` : `${paper.durationMinutes} Mins`)
    : '2 Hours';
  const paperQuestions = paper?.totalQuestions || 100;
  const paperMarks = paper?.totalMarks || (paperQuestions * 2);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        maxWidth: '520px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Modal Header */}
        <div style={{
          backgroundColor: '#004d73',
          color: '#ffffff',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, fontFamily: 'var(--font-heading)' }}>
                Candidate Verification
              </h3>
              <p style={{ fontSize: '11px', margin: 0, opacity: 0.85 }}>
                {paperTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Exam Summary Pill */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
              Paper: {paperTitle}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              fontSize: '11px',
              color: '#475569'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={13} color="#0284c7" />
                <span><strong>Duration:</strong> {paperDuration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Award size={13} color="#16a34a" />
                <span><strong>Questions:</strong> {paperQuestions}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle2 size={13} color="#7c3aed" />
                <span><strong>Marks:</strong> {paperMarks} (+2 / 0)</span>
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#334155',
              marginBottom: '6px'
            }}>
              Enter Candidate's Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="candidate-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Amit Parmar"
                autoFocus
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: error ? '1.5px solid #ef4444' : '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>
            {error && (
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldAlert size={14} />
                {error}
              </p>
            )}
          </div>

          {/* Quick preset suggestions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Quick select:</span>
            {['Amit Parmar', 'Rajesh Sharma', 'Pooja Verma'].map((sampleName) => (
              <button
                key={sampleName}
                type="button"
                onClick={() => {
                  setName(sampleName);
                  setError('');
                }}
                style={{
                  fontSize: '11px',
                  padding: '3px 8px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                {sampleName}
              </button>
            ))}
          </div>

          {/* Instructions Checkbox */}
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            fontSize: '12px',
            color: '#475569',
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fef3c7',
            borderRadius: '6px',
            marginBottom: '22px'
          }}>
            <input
              id="instructions-agree-checkbox"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: '2px', cursor: 'pointer' }}
            />
            <span>
              I have read and understood all instructions regarding the UGC NET Computer Based Test. I agree to abide by all the rules and start the 2-hour examination.
            </span>
          </label>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button
              id="btn-modal-start-test"
              type="submit"
              style={{
                padding: '9px 24px',
                borderRadius: '6px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 2px 4px rgba(22, 163, 74, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Start Examination</span>
              <span style={{ fontSize: '15px' }}>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
