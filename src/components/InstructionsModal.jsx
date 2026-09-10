import React from 'react';
import { X, HelpCircle, AlertCircle } from 'lucide-react';

export default function InstructionsModal({ isOpen, onClose }) {
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
        maxWidth: '780px',
        width: '100%',
        maxHeight: '85vh',
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
            <HelpCircle size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, fontFamily: 'var(--font-heading)' }}>
              General Instructions - NTA CBT Pattern
            </h3>
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

        {/* Content */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          fontSize: '13px',
          lineHeight: 1.65,
          color: '#334155'
        }}>
          <h4 style={{ color: '#004d73', marginBottom: '10px', fontSize: '14px' }}>
            1. Question Palette Symbols and Status:
          </h4>
          <p style={{ marginBottom: '12px' }}>
            The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
            backgroundColor: '#f8fafc',
            padding: '14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="palette-btn status-not-visited">01</span>
              <span>You have not visited the question yet.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="palette-btn status-not-answered">02</span>
              <span>You have not answered the question.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="palette-btn status-answered">03</span>
              <span>You have answered the question.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="palette-btn status-marked">04</span>
              <span>You have NOT answered the question, but have marked the question for review.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="palette-btn status-answered-marked">05</span>
              <span>
                The question(s) "Answered and Marked for Review" will be <strong>considered for evaluation</strong>.
              </span>
            </div>
          </div>

          <h4 style={{ color: '#004d73', marginBottom: '10px', fontSize: '14px' }}>
            2. Navigating to a Question:
          </h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
            <li>Click on <strong>Save & Next</strong> to save your answer for the current question and then go to the next question.</li>
            <li>Click on <strong>Mark for Review & Next</strong> to save your answer for the current question, mark it for review, and then go to the next question.</li>
          </ul>

          <h4 style={{ color: '#004d73', marginBottom: '10px', fontSize: '14px' }}>
            3. Answering a Question:
          </h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>To select your answer, click on the button of one of the options (A, B, C, D).</li>
            <li>To deselect your chosen answer, click on the button of the chosen option again or click on the <strong>Clear Response</strong> button.</li>
            <li>To change your chosen answer, click on the button of another option.</li>
            <li>To save your answer, you MUST click on the <strong>Save & Next</strong> button.</li>
          </ul>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: '#eff6ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe',
            color: '#1e40af',
            fontSize: '12px'
          }}>
            <AlertCircle size={16} />
            <span>Marking Scheme: Each correct answer awards <strong>+2 Marks</strong>. There is <strong>no negative marking</strong> for incorrect or unanswered questions. Total examination duration is <strong>2 Hours (120 minutes)</strong>.</span>
          </div>
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
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
