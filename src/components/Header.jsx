import React from 'react';
import { BookOpen, HelpCircle, FileText, User } from 'lucide-react';

export default function Header({ 
  candidateName, 
  onOpenQuestionPaper, 
  onOpenInstructions,
  inExam = false 
}) {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #006699',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Branding - NTA Replica Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {/* Custom SVG Emblem */}
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f58220 0%, #ffffff 50%, #008751 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              border: '2px solid #006699'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '11px',
                color: '#006699',
                letterSpacing: '-0.5px'
              }}>
                NTA
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 800, 
                color: '#004d73', 
                letterSpacing: '0.5px',
                lineHeight: 1.1,
                fontFamily: 'var(--font-heading)'
              }}>
                NATIONAL TESTING AGENCY
              </div>
              <div style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#16a34a',
                letterSpacing: '0.5px'
              }}>
                Excellence in Assessment
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
                Ministry of Education • Government of India
              </div>
            </div>
          </div>

          <div style={{
            height: '32px',
            width: '1px',
            backgroundColor: '#e2e8f0',
            margin: '0 4px',
            display: 'none'
          }} />

          <div style={{
            padding: '3px 10px',
            borderRadius: '4px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            fontSize: '12px',
            fontWeight: 700,
            color: '#1e40af',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2563eb'
            }} />
            UGC NET 2025 CBT Portal
          </div>
        </div>

        {/* Right Action Helpers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {inExam && onOpenQuestionPaper && (
            <button
              id="header-btn-question-paper"
              onClick={onOpenQuestionPaper}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid #cbd5e1'
              }}
              title="View full question paper"
            >
              <FileText size={15} color="#0284c7" />
              <span>Question Paper</span>
            </button>
          )}

          {inExam && onOpenInstructions && (
            <button
              id="header-btn-instructions"
              onClick={onOpenInstructions}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid #cbd5e1'
              }}
              title="View exam instructions"
            >
              <HelpCircle size={15} color="#6366f1" />
              <span>Instructions</span>
            </button>
          )}

          {candidateName && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '20px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {candidateName.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                {candidateName}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
