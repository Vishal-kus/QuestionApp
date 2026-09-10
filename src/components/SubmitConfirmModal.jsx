import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onFinalSubmit,
  stats,
  remainingSeconds
}) {
  if (!isOpen) return null;

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 120,
      padding: '16px'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        maxWidth: '680px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        border: '1px solid #cbd5e1'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#004d73',
          color: '#ffffff',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertTriangle size={22} color="#f59e0b" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            Exam Summary & Final Confirmation
          </h3>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            padding: '10px 14px',
            backgroundColor: '#eff6ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe',
            fontSize: '13px'
          }}>
            <span style={{ fontWeight: 600, color: '#1e3a8a' }}>
              Paper: UGC NET 2025 Computer Science & Applications
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: '#0284c7'
            }}>
              <Clock size={15} />
              Time Left: {formatTime(remainingSeconds)}
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '14px' }}>
            Below is the current status of your responses across all questions:
          </p>

          {/* NTA Summary Table */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            marginBottom: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#334155', textAlign: 'center' }}>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Section</th>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>No. of Questions</th>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0', color: '#16a34a' }}>Answered</th>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0', color: '#dc2626' }}>Not Answered</th>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0', color: '#7c3aed' }}>Marked for Review</th>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0', color: '#7c3aed' }}>Answered & Marked</th>
                <th style={{ padding: '10px', border: '1px solid #e2e8f0', color: '#64748b' }}>Not Visited</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center', backgroundColor: '#ffffff', fontWeight: 600 }}>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                  Computer Science (Paper II)
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                  {stats.total}
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', color: '#16a34a' }}>
                  {stats.answered}
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', color: '#dc2626' }}>
                  {stats.notAnswered}
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', color: '#7c3aed' }}>
                  {stats.marked}
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', color: '#7c3aed' }}>
                  {stats.answeredMarked}
                </td>
                <td style={{ padding: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                  {stats.notVisited}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{
            padding: '12px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fef3c7',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#b45309',
            lineHeight: 1.5,
            marginBottom: '20px'
          }}>
            <strong>Important Notice:</strong> Are you sure you want to submit for final evaluation? Once submitted, you will not be allowed to modify any of your responses, and your detailed result analysis will be generated immediately.
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Resume Test / Go Back
            </button>
            <button
              id="btn-confirm-final-submit"
              onClick={onFinalSubmit}
              style={{
                padding: '10px 24px',
                borderRadius: '6px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 2px 5px rgba(22, 163, 74, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CheckCircle size={16} />
              <span>Yes, Submit Examination</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
