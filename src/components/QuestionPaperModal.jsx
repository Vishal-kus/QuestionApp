import React from 'react';
import { X, FileText } from 'lucide-react';

export default function QuestionPaperModal({ isOpen, onClose, questions }) {
  if (!isOpen) return null;

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
      zIndex: 110,
      padding: '20px'
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        maxWidth: '860px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        border: '1px solid #cbd5e1',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#004d73',
          color: '#ffffff',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, fontFamily: 'var(--font-heading)' }}>
                Question Paper - UGC NET 2025
              </h3>
              <p style={{ fontSize: '11px', margin: 0, opacity: 0.85 }}>
                Computer Science & Applications • Total {questions.length} Questions
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
              display: 'flex'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Questions list */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {questions.map((q, idx) => (
            <div key={q.question_no} style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px',
                gap: '10px'
              }}>
                <span style={{ fontWeight: 800, color: '#004d73', fontSize: '14px' }}>
                  Q{idx + 1}. (Question ID: {q.question_no})
                </span>
                <span style={{
                  fontSize: '11px',
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: 600
                }}>
                  {q.unit}
                </span>
              </div>

              <div style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#1e293b',
                whiteSpace: 'pre-line',
                marginBottom: '12px'
              }}>
                {q.question}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '8px'
              }}>
                {Object.entries(q.options).map(([optKey, optText]) => (
                  <div key={optKey} style={{
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#334155'
                  }}>
                    <strong style={{ color: '#004d73', marginRight: '6px' }}>({optKey})</strong>
                    {optText}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f1f5f9',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              backgroundColor: '#006699',
              color: '#ffffff',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '13px'
            }}
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
